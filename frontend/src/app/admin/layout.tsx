'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getToken, getAdminInfo, logoutAdmin } from '@/lib/api';
import Sidebar from './components/Sidebar';
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
      <Sidebar sidebarOpen={sidebarOpen} handleLogout={handleLogout} />

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
