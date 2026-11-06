// Small helpers shared by the admin pages. The server enforces every permission;
// these only decide what to show.

export const canManageTours = (role) => role === 'superadmin' || role === 'manager';
export const canManageStaff = (role) => role === 'superadmin';

export const BOOKING_STATUSES = ['Pending', 'Contacted', 'Confirmed', 'Rejected', 'Cancelled'];
export const CONTACT_STATUSES = ['New', 'Read', 'Replied'];
export const TOUR_CATEGORIES = ['Pilgrimage', 'Honeymoon', 'Adventure', 'Leisure', 'Family', 'Wildlife', 'Cultural'];
export const ROLES = [
  { value: 'superadmin', label: 'Super admin: everything' },
  { value: 'manager', label: 'Manager: tours, enquiries, messages' },
  { value: 'support', label: 'Support: enquiries and messages' },
];

export const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '-';

export const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
    : '-';

// Numbers typed without a country code are treated as Indian (+91).
export function whatsappHref(phone, text = '') {
  let digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return null;
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  if (digits.length === 10) digits = `91${digits}`;
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

export const telHref = (phone) => (phone ? `tel:${String(phone).replace(/[^\d+]/g, '')}` : null);
