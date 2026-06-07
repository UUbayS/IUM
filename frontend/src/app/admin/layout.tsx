'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getToken, getAdminInfo, logoutAdmin } from '@/lib/api';
import styles from './layout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminName, setAdminName] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) return;
    const token = getToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }
    const info = getAdminInfo();
    if (info) {
      setAdminName(info.name);
    }
  }, [router, isLoginPage]);

  async function handleLogout() {
    try {
      await logoutAdmin();
    } catch {
      // ignore
    }
    router.push('/admin/login');
  }

  // Skip layout wrapper for login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminWrapper}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>PSB Admin</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <Link
            href="/admin/dashboard"
            className={`${styles.navItem} ${pathname?.startsWith('/admin/dashboard') ? styles.navItemActive : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/"
            className={styles.navItem}
            target="_blank"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>Lihat Website</span>
          </Link>
          <button onClick={handleLogout} className={`${styles.navItem} ${styles.navItemLogout}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className={styles.mainContent}>
        <header className={styles.topBar}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={styles.menuToggle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className={styles.topBarRight}>
            <div className={styles.adminBadge}>
              <div className={styles.adminAvatar}>
                {adminName ? adminName.charAt(0).toUpperCase() : 'A'}
              </div>
              <span className={styles.adminNameText}>{adminName || 'Admin'}</span>
            </div>
          </div>
        </header>
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
