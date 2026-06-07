'use client';

import { useState } from 'react';
import { checkRegistrationStatus } from '@/lib/api';
import styles from './page.module.css';

const STATUS_LABELS: Record<string, { label: string; color: string; desc: string }> = {
  MENUNGGU_VERIFIKASI: { label: 'Menunggu Verifikasi', color: '#f59e0b', desc: 'Data Anda sedang kami proses.' },
  BERKAS_KURANG: { label: 'Berkas Kurang', color: '#ef4444', desc: 'Ada berkas yang belum lengkap atau tidak valid. Harap periksa catatan admin.' },
  MENUNGGU_PEMBAYARAN: { label: 'Menunggu Pembayaran', color: '#8b5cf6', desc: 'Berkas valid, silakan lakukan pembayaran.' },
  PEMBAYARAN_TERVERIFIKASI: { label: 'Pembayaran Terverifikasi', color: '#3b82f6', desc: 'Pembayaran diterima.' },
  DITERIMA: { label: 'Diterima', color: '#22c55e', desc: 'Selamat! Anda diterima menjadi santri.' },
  DITOLAK: { label: 'Ditolak', color: '#ef4444', desc: 'Mohon maaf, Anda belum dapat diterima tahun ini.' },
};

export default function CekStatusPage() {
  const [regNumber, setRegNumber] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNumber || !accessCode) {
      setError('Mohon isi Nomor Pendaftaran dan Kode Akses');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await checkRegistrationStatus(regNumber, accessCode);
      setResult(res.data);
    } catch (err: any) {
      setError(err.message || 'Data tidak ditemukan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Cek Status Pendaftaran</h1>
        <p className={styles.heroSubtitle}>
          Pantau progres pendaftaran Anda secara real-time. Masukkan Nomor Pendaftaran dan Kode Akses yang telah diberikan.
        </p>
      </section>

      <div className={styles.contentWrapper}>
        <div className={styles.checkCard}>
          <form onSubmit={handleCheck} className={styles.formGroup}>
            <div className={styles.inputRow}>
              <div className={styles.inputCol}>
                <label className={styles.label}>Nomor Pendaftaran</label>
                <input 
                  type="text" 
                  value={regNumber} 
                  onChange={(e) => setRegNumber(e.target.value)} 
                  placeholder="Cth: REG-XXX" 
                  className={styles.inputBox} 
                />
              </div>
              <div className={styles.inputCol}>
                <label className={styles.label}>Kode Akses</label>
                <input 
                  type="text" 
                  value={accessCode} 
                  onChange={(e) => setAccessCode(e.target.value)} 
                  placeholder="Masukkan 6 digit kode" 
                  className={styles.inputBox} 
                />
              </div>
            </div>
            
            {error && <div className={styles.errorMessage}>{error}</div>}

            <button type="submit" className={styles.btnSubmit} disabled={loading}>
              {loading ? 'Mencari...' : 'Cek Status Sekarang'}
            </button>
          </form>
        </div>

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <h2 className={styles.resultTitle}>Hasil Pencarian</h2>
            </div>
            
            <div className={styles.resultGrid}>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Nama Santri</span>
                <span className={styles.resultValue}>{result.student_name || '-'}</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Jenjang</span>
                <span className={styles.resultValue}>{result.registration_level}</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Tanggal Daftar</span>
                <span className={styles.resultValue}>{new Date(result.submitted_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Status Pembayaran</span>
                <span className={styles.resultValue}>{result.payment_status || 'Belum Ada'}</span>
              </div>
            </div>

            <div className={styles.statusBox} style={{ background: `${STATUS_LABELS[result.status]?.color}15`, border: `1px solid ${STATUS_LABELS[result.status]?.color}30` }}>
              <h3 className={styles.statusTitle} style={{ color: STATUS_LABELS[result.status]?.color }}>
                {STATUS_LABELS[result.status]?.label || result.status}
              </h3>
              <p className={styles.statusDesc}>
                {STATUS_LABELS[result.status]?.desc}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
