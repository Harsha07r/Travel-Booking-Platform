'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/adminApi';
import { canManageStaff, canManageTours } from '@/lib/adminUi';
import PasswordDialog from '@/components/admin/PasswordDialog';

const AdminContext = createContext(null);
export const useAdmin = () => useContext(AdminContext);

const ROLE_LABEL = { superadmin: 'Super admin', manager: 'Manager', support: 'Support' };

export default function AdminShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api('/admin/me')
      .then((data) => !cancelled && setAdmin(data.admin))
      .catch(() => !cancelled && router.replace('/admin/login'));
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function logout() {
    await api('/admin/logout', { method: 'POST' }).catch(() => {});
    router.replace('/admin/login');
  }

  if (!admin) return <div className="admin-loading">Loading&hellip;</div>;

  const links = [
    { href: '/admin', label: 'Enquiries' },
    { href: '/admin/messages', label: 'Messages' },
    ...(canManageTours(admin.role) ? [{ href: '/admin/tours', label: 'Tours' }] : []),
    ...(canManageStaff(admin.role) ? [{ href: '/admin/staff', label: 'Staff' }] : []),
  ];

  return (
    <AdminContext.Provider value={{ admin }}>
      <div className="admin">
        <header className="admin-bar">
          <div className="admin-bar__inner">
            <span className="admin-brand">
              Royal <b>Horizon</b> <small>Admin</small>
            </span>
            <nav className="admin-nav" aria-label="Admin">
              {links.map((l) => (
                <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="admin-user">
              <span title={admin.email}>
                {admin.username} <em>{ROLE_LABEL[admin.role] || admin.role}</em>
              </span>
              <button type="button" onClick={() => setShowPassword(true)}>
                Password
              </button>
              <button type="button" onClick={logout}>
                Log out
              </button>
            </div>
          </div>
        </header>
        <main className="admin-main">{children}</main>
        {showPassword && <PasswordDialog onClose={() => setShowPassword(false)} />}
      </div>
    </AdminContext.Provider>
  );
}
