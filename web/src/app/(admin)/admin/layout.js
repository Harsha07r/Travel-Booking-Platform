import './admin.css';

// Admin pages are private: keep them out of search results.
export const metadata = {
  title: { absolute: 'Admin | Royal Horizon' },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return children;
}
