/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,

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
