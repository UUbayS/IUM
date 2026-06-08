'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getRegistrations, exportRegistrations } from '@/lib/api';
import styles from './page.module.css';

interface Student {
  fullName: string;
  nisn: string;
  gender: string;
}

interface Payment {
  paymentStatus: string;
}

interface Registration {
  id: string;
  registrationNumber: string;
  registrationLevel: string;
  status: string;
  submittedAt: string;
  student: Student | null;
  payment: Payment | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  MENUNGGU_VERIFIKASI: { label: 'Menunggu Verifikasi', color: '#f59e0b' },
  BERKAS_KURANG: { label: 'Berkas Kurang', color: '#ef4444' },
  MENUNGGU_PEMBAYARAN: { label: 'Menunggu Pembayaran', color: '#8b5cf6' },
  PEMBAYARAN_TERVERIFIKASI: { label: 'Pembayaran Terverifikasi', color: '#3b82f6' },
  DITERIMA: { label: 'Diterima', color: '#22c55e' },
  DITOLAK: { label: 'Ditolak', color: '#ef4444' },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [exporting, setExporting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function showError(msg: string) {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(''), 3000);
  }

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const result = await getRegistrations({
        page,
        limit: 20,
        status: filterStatus || undefined,
        level: filterLevel || undefined,
        keyword: keyword || undefined,
      });
      setRegistrations(result.data);
      setPagination(result.pagination);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'UNAUTHORIZED') {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterLevel, keyword, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchData(1);
  }

  async function handleExport() {
    setExporting(true);
    try {
      await exportRegistrations({
        status: filterStatus || undefined,
        level: filterLevel || undefined,
      });
    } catch {
      showError('Gagal export data');
    } finally {
      setExporting(false);
    }
  }

  // Stats
  const totalAll = pagination.total;
  const totalMenunggu = registrations.filter(r => r.status === 'MENUNGGU_VERIFIKASI').length;
  const totalDiterima = registrations.filter(r => r.status === 'DITERIMA').length;
  const totalDitolak = registrations.filter(r => r.status === 'DITOLAK').length;

  return (
    <div className={styles.dashboard}>
      {errorMsg && <div className={styles.errorToast}>{errorMsg}</div>}
      <h1 className={styles.pageTitle}>Dashboard Pendaftaran Santri Baru</h1>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{totalAll}</span>
            <span className={styles.statLabel}>Total Pendaftar</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{totalMenunggu}</span>
            <span className={styles.statLabel}>Menunggu Verifikasi</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{totalDiterima}</span>
            <span className={styles.statLabel}>Diterima</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statNumber}>{totalDitolak}</span>
            <span className={styles.statLabel}>Ditolak</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filterBar}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Cari nama santri..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn}>Cari</button>
        </form>
        <div className={styles.filterGroup}>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={styles.filterSelect}>
            <option value="">Semua Status</option>
            <option value="MENUNGGU_VERIFIKASI">Menunggu Verifikasi</option>
            <option value="BERKAS_KURANG">Berkas Kurang</option>
            <option value="MENUNGGU_PEMBAYARAN">Menunggu Pembayaran</option>
            <option value="PEMBAYARAN_TERVERIFIKASI">Pembayaran Terverifikasi</option>
            <option value="DITERIMA">Diterima</option>
            <option value="DITOLAK">Ditolak</option>
          </select>
          <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className={styles.filterSelect}>
            <option value="">Semua Jenjang</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA</option>
          </select>
          <button onClick={handleExport} className={styles.exportBtn} disabled={exporting}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            {exporting ? 'Exporting...' : 'Export Excel'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.tableSpinner}></div>
            <p>Memuat data...</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className={styles.emptyState}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            <p>Belum ada data pendaftar.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No. Pendaftaran</th>
                <th>Nama Santri</th>
                <th>Jenjang</th>
                <th>Status</th>
                <th>Tanggal Daftar</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg.id}>
                  <td className={styles.tdCode}>{reg.registrationNumber}</td>
                  <td>{reg.student?.fullName || '-'}</td>
                  <td><span className={styles.levelBadge}>{reg.registrationLevel}</span></td>
                  <td>
                    <span
                      className={styles.statusBadge}
                      style={{ background: `${STATUS_LABELS[reg.status]?.color}18`, color: STATUS_LABELS[reg.status]?.color, borderColor: `${STATUS_LABELS[reg.status]?.color}40` }}
                    >
                      {STATUS_LABELS[reg.status]?.label || reg.status}
                    </span>
                  </td>
                  <td className={styles.tdDate}>{new Date(reg.submittedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td>
                    <Link href={`/admin/dashboard/${reg.id}`} className={styles.detailBtn}>
                      Lihat Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => fetchData(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className={styles.pageBtn}
          >
            &laquo; Sebelumnya
          </button>
          <span className={styles.pageInfo}>
            Halaman {pagination.page} dari {pagination.totalPages}
          </span>
          <button
            onClick={() => fetchData(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className={styles.pageBtn}
          >
            Selanjutnya &raquo;
          </button>
        </div>
      )}
    </div>
  );
}
