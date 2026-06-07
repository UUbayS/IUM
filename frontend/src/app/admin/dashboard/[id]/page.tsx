'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getRegistrationDetail,
  updateRegistrationStatus,
  verifyDocument,
  verifyPayment,
  getDocumentDownloadUrl,
  getToken,
} from '@/lib/api';
import styles from './page.module.css';

interface Student {
  fullName: string;
  birthPlace: string;
  birthDate: string;
  gender: string;
  childOrder: number;
  nisn: string;
  academicLevel: string;
  entryClass: string;
  previousSchool: string;
}

interface Parent {
  fatherName: string;
  fatherJob: string;
  fatherBirthPlace: string;
  fatherBirthDate: string;
  fatherPhone: string;
  motherName: string;
  motherJob: string;
  motherBirthPlace: string;
  motherBirthDate: string;
  motherPhone: string;
}

interface Document {
  id: string;
  documentType: string;
  fileOriginalName: string;
  verificationStatus: string;
  adminNote: string | null;
}

interface Payment {
  id: string;
  senderAccountName: string;
  transferDate: string;
  paymentStatus: string;
  paymentProofPath: string;
  adminNote: string | null;
}

interface RegistrationDetail {
  id: string;
  registrationNumber: string;
  registrationLevel: string;
  status: string;
  adminNote: string | null;
  submittedAt: string;
  student: Student | null;
  parent: Parent | null;
  documents: Document[];
  payment: Payment | null;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  MENUNGGU_VERIFIKASI: { label: 'Menunggu Verifikasi', color: '#f59e0b' },
  BERKAS_KURANG: { label: 'Berkas Kurang', color: '#ef4444' },
  MENUNGGU_PEMBAYARAN: { label: 'Menunggu Pembayaran', color: '#8b5cf6' },
  PEMBAYARAN_TERVERIFIKASI: { label: 'Pembayaran Terverifikasi', color: '#3b82f6' },
  DITERIMA: { label: 'Diterima', color: '#22c55e' },
  DITOLAK: { label: 'Ditolak', color: '#ef4444' },
};

const DOC_STATUS: Record<string, { label: string; color: string }> = {
  BELUM_DICEK: { label: 'Belum Dicek', color: '#94a3b8' },
  VALID: { label: 'Valid', color: '#22c55e' },
  TIDAK_VALID: { label: 'Tidak Valid', color: '#ef4444' },
  PERLU_REVISI: { label: 'Perlu Revisi', color: '#f59e0b' },
};

const DOC_TYPE_LABELS: Record<string, string> = {
  KARTU_KELUARGA: 'Kartu Keluarga',
  KARTU_NISN: 'Kartu NISN',
  AKTA_KELAHIRAN: 'Akta Kelahiran',
  KTP_ORANG_TUA: 'KTP Orang Tua',
  TRANSKRIP_NILAI: 'Transkrip Nilai',
  IJAZAH: 'Ijazah',
  SKL_MUTASI: 'SKL / Mutasi',
};

const PAY_STATUS: Record<string, { label: string; color: string }> = {
  MENUNGGU_VERIFIKASI: { label: 'Menunggu Verifikasi', color: '#f59e0b' },
  VALID: { label: 'Valid', color: '#22c55e' },
  TIDAK_VALID: { label: 'Tidak Valid', color: '#ef4444' },
};

export default function RegistrationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<RegistrationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusNote, setStatusNote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchDetail();
  }, [id]);

  async function fetchDetail() {
    setLoading(true);
    try {
      const result = await getRegistrationDetail(id);
      setData(result.data);
      setSelectedStatus(result.data.status);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'UNAUTHORIZED') {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  }

  function showSuccess(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  }

  async function handleStatusUpdate() {
    if (!data || selectedStatus === data.status) return;
    setStatusLoading(true);
    try {
      await updateRegistrationStatus(data.id, selectedStatus, statusNote);
      showSuccess('Status berhasil diperbarui!');
      setStatusNote('');
      fetchDetail();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal update status');
    } finally {
      setStatusLoading(false);
    }
  }

  async function handleDocVerify(docId: string, status: string) {
    try {
      await verifyDocument(docId, status);
      showSuccess('Status dokumen diperbarui!');
      fetchDetail();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal verifikasi dokumen');
    }
  }

  async function handlePaymentVerify(payId: string, status: string) {
    try {
      await verifyPayment(payId, status);
      showSuccess('Status pembayaran diperbarui!');
      fetchDetail();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal verifikasi pembayaran');
    }
  }

  function handleDocDownload(docId: string) {
    const url = getDocumentDownloadUrl(docId);
    const token = getToken();
    // Open in new tab with auth
    window.open(`${url}?token=${token}`, '_blank');
  }

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.spinner}></div>
        <p>Memuat detail pendaftar...</p>
      </div>
    );
  }

  if (!data) {
    return <div className={styles.loadingPage}><p>Data tidak ditemukan</p></div>;
  }

  const s = data.student;
  const p = data.parent;
  const statusInfo = STATUS_LABELS[data.status];

  return (
    <div className={styles.detailPage}>
      {successMsg && <div className={styles.successToast}>{successMsg}</div>}

      {/* Header */}
      <div className={styles.detailHeader}>
        <Link href="/admin/dashboard" className={styles.backLink}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Kembali
        </Link>
        <div className={styles.headerInfo}>
          <h1 className={styles.detailTitle}>Detail Pendaftar</h1>
          <div className={styles.headerMeta}>
            <span className={styles.regNumber}>{data.registrationNumber}</span>
            <span className={styles.statusBadgeLg} style={{ background: `${statusInfo?.color}18`, color: statusInfo?.color, borderColor: `${statusInfo?.color}40` }}>
              {statusInfo?.label}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.detailGrid}>
        {/* Left Column */}
        <div className={styles.detailLeft}>
          {/* Data Santri */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Data Santri
            </h2>
            {s ? (
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}><span className={styles.infoLabel}>Nama Lengkap</span><span className={styles.infoValue}>{s.fullName}</span></div>
                <div className={styles.infoItem}><span className={styles.infoLabel}>Tempat, Tanggal Lahir</span><span className={styles.infoValue}>{s.birthPlace}, {new Date(s.birthDate).toLocaleDateString('id-ID')}</span></div>
                <div className={styles.infoItem}><span className={styles.infoLabel}>Jenis Kelamin</span><span className={styles.infoValue}>{s.gender === 'LAKI_LAKI' ? 'Laki-laki' : 'Perempuan'}</span></div>
                <div className={styles.infoItem}><span className={styles.infoLabel}>Anak Ke</span><span className={styles.infoValue}>{s.childOrder}</span></div>
                <div className={styles.infoItem}><span className={styles.infoLabel}>NISN</span><span className={styles.infoValue}>{s.nisn}</span></div>
                <div className={styles.infoItem}><span className={styles.infoLabel}>Jenjang Akademik</span><span className={styles.infoValue}>{s.academicLevel || '-'}</span></div>
                <div className={styles.infoItem}><span className={styles.infoLabel}>Masuk Kelas</span><span className={styles.infoValue}>{s.entryClass}</span></div>
                <div className={styles.infoItem}><span className={styles.infoLabel}>Sekolah Asal</span><span className={styles.infoValue}>{s.previousSchool}</span></div>
              </div>
            ) : <p className={styles.noData}>Data santri belum diisi</p>}
          </div>

          {/* Data Orang Tua */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Data Orang Tua
            </h2>
            {p ? (
              <div className={styles.parentGrid}>
                <div>
                  <h3 className={styles.parentSubtitle}>Ayah</h3>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}><span className={styles.infoLabel}>Nama</span><span className={styles.infoValue}>{p.fatherName}</span></div>
                    <div className={styles.infoItem}><span className={styles.infoLabel}>Pekerjaan</span><span className={styles.infoValue}>{p.fatherJob}</span></div>
                    <div className={styles.infoItem}><span className={styles.infoLabel}>TTL</span><span className={styles.infoValue}>{p.fatherBirthPlace}, {new Date(p.fatherBirthDate).toLocaleDateString('id-ID')}</span></div>
                    <div className={styles.infoItem}><span className={styles.infoLabel}>No. Telepon</span><span className={styles.infoValue}>{p.fatherPhone}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className={styles.parentSubtitle}>Ibu</h3>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}><span className={styles.infoLabel}>Nama</span><span className={styles.infoValue}>{p.motherName}</span></div>
                    <div className={styles.infoItem}><span className={styles.infoLabel}>Pekerjaan</span><span className={styles.infoValue}>{p.motherJob}</span></div>
                    <div className={styles.infoItem}><span className={styles.infoLabel}>TTL</span><span className={styles.infoValue}>{p.motherBirthPlace}, {new Date(p.motherBirthDate).toLocaleDateString('id-ID')}</span></div>
                    <div className={styles.infoItem}><span className={styles.infoLabel}>No. Telepon</span><span className={styles.infoValue}>{p.motherPhone}</span></div>
                  </div>
                </div>
              </div>
            ) : <p className={styles.noData}>Data orang tua belum diisi</p>}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.detailRight}>
          {/* Update Status */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
              Update Status
            </h2>
            <div className={styles.statusForm}>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className={styles.statusSelect}>
                <option value="MENUNGGU_VERIFIKASI">Menunggu Verifikasi</option>
                <option value="BERKAS_KURANG">Berkas Kurang</option>
                <option value="MENUNGGU_PEMBAYARAN">Menunggu Pembayaran</option>
                <option value="PEMBAYARAN_TERVERIFIKASI">Pembayaran Terverifikasi</option>
                <option value="DITERIMA">Diterima</option>
                <option value="DITOLAK">Ditolak</option>
              </select>
              <textarea
                placeholder="Catatan admin (opsional)..."
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                className={styles.statusNote}
                rows={2}
              />
              <button onClick={handleStatusUpdate} disabled={statusLoading || selectedStatus === data.status} className={styles.statusBtn}>
                {statusLoading ? 'Menyimpan...' : 'Simpan Status'}
              </button>
            </div>
          </div>

          {/* Dokumen */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              Dokumen
            </h2>
            {data.documents.length > 0 ? (
              <div className={styles.docList}>
                {data.documents.map((doc) => (
                  <div key={doc.id} className={styles.docItem}>
                    <div className={styles.docInfo}>
                      <span className={styles.docType}>{DOC_TYPE_LABELS[doc.documentType] || doc.documentType}</span>
                      <span className={styles.docFile}>{doc.fileOriginalName}</span>
                      <span className={styles.docStatusBadge} style={{ color: DOC_STATUS[doc.verificationStatus]?.color }}>
                        {DOC_STATUS[doc.verificationStatus]?.label}
                      </span>
                    </div>
                    <div className={styles.docActions}>
                      <button onClick={() => handleDocDownload(doc.id)} className={styles.docActionBtn} title="Download">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      </button>
                      <select
                        value={doc.verificationStatus}
                        onChange={(e) => handleDocVerify(doc.id, e.target.value)}
                        className={styles.docSelect}
                      >
                        <option value="BELUM_DICEK">Belum Dicek</option>
                        <option value="VALID">Valid</option>
                        <option value="TIDAK_VALID">Tidak Valid</option>
                        <option value="PERLU_REVISI">Perlu Revisi</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className={styles.noData}>Belum ada dokumen</p>}
          </div>

          {/* Pembayaran */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              Pembayaran
            </h2>
            {data.payment ? (
              <div className={styles.paymentInfo}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}><span className={styles.infoLabel}>Nama Pengirim</span><span className={styles.infoValue}>{data.payment.senderAccountName}</span></div>
                  <div className={styles.infoItem}><span className={styles.infoLabel}>Tanggal Transfer</span><span className={styles.infoValue}>{new Date(data.payment.transferDate).toLocaleDateString('id-ID')}</span></div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Status</span>
                    <span className={styles.infoValue} style={{ color: PAY_STATUS[data.payment.paymentStatus]?.color, fontWeight: 700 }}>
                      {PAY_STATUS[data.payment.paymentStatus]?.label}
                    </span>
                  </div>
                </div>
                <div className={styles.paymentActions}>
                  <button onClick={() => handlePaymentVerify(data.payment!.id, 'VALID')} className={styles.payAcceptBtn} disabled={data.payment.paymentStatus === 'VALID'}>
                    ✓ Terima
                  </button>
                  <button onClick={() => handlePaymentVerify(data.payment!.id, 'TIDAK_VALID')} className={styles.payRejectBtn} disabled={data.payment.paymentStatus === 'TIDAK_VALID'}>
                    ✗ Tolak
                  </button>
                </div>
              </div>
            ) : <p className={styles.noData}>Belum ada data pembayaran</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
