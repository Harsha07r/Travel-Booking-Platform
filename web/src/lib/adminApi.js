// Browser-side client for the admin API. Requests go to /api/... on this same domain
// (Next forwards them to the backend), and the login lives in httpOnly cookies, so no
// token is ever readable from JavaScript.

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

const send = (path, { method = 'GET', body } = {}) =>
  fetch(`/api${path}`, {
    method,
    credentials: 'same-origin',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

let refreshing = null; // one refresh at a time, shared by parallel requests

export async function api(path, options = {}) {
  let res;
  try {
    res = await send(path, options);
  } catch {
    throw new ApiError(0, 'Cannot reach the server. Check your connection and try again.');
  }

  // Access tokens last 15 minutes: quietly renew the session once, then retry.
  const skipRefresh = path.startsWith('/admin/login') || path.startsWith('/admin/refresh');
  if (res.status === 401 && !skipRefresh) {
    refreshing ??= send('/admin/refresh', { method: 'POST' }).finally(() => {
      refreshing = null;
    });
    const renewed = await refreshing.catch(() => null);
    if (renewed?.ok) res = await send(path, options);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data.details?.map((d) => d.message).join('. ');
    throw new ApiError(res.status, detail || data.message || 'Request failed', data.details);
  }
  return data;
}
