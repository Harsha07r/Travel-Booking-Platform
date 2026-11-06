const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,

  // The admin panel calls /api/... on this same domain and Next forwards it to the backend.
  // That keeps the login cookies first-party, so they work in every browser.
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${API_URL}/api/:path*` }];
  },

  // Old React-app URLs -> new tour pages, so existing links and Google results keep working.
  async redirects() {
    const old = {
      '/katra-tour': '/tours/katra-shivkhori-kashmir',
      '/ladakh-tour': '/tours/rendezvous-ladakh-tour',
      '/houseboat-tour': '/tours/kashmir-houseboat-tour',
      '/honeymoon-tour': '/tours/kashmir-honeymoon-tour',
      '/heavenly-tour': '/tours/heavenly-kashmir-tours',
      '/tour-details': '/tours/kashmir-5n-6d-package',
      '/tour/:id': '/tours',
      '/login': '/',
      '/register': '/',
    };
    return Object.entries(old).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
