'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { submitPublicRegistration } from "@/lib/api";
import styles from "./page.module.css";

export default function Daftar() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Bypass hydration errors caused by browser extensions injecting attributes
  useEffect(() => {
    setMounted(true);
  }, []);

  // Success state
  const [regNumber, setRegNumber] = useState('');
  const [accessCode, setAccessCode] = useState('');

  // Form Data State
  const [formData, setFormData] = useState({
    registration_level: 'SMP',
    full_name: '',
    birth_place: '',
    birth_date: '',
    gender: 'LAKI_LAKI',
    child_order: '',
    nisn: '',
    academic_level: 'MTS',
    entry_class: '',
    previous_school: '',

    father_name: '',
    father_job: '',
    father_birth_place: '',
    father_birth_date: '',
    father_phone: '',

    mother_name: '',
    mother_job: '',
    mother_birth_place: '',
    mother_birth_date: '',
    mother_phone: '',

    sender_account_name: '',
    transfer_date: '',
  });

  // Files State
  const [files, setFiles] = useState<Record<string, File | null>>({
    kartu_keluarga: null,
    kartu_nisn: null,
    akta_kelahiran: null,
    ktp_orang_tua: null,
    transkrip_nilai: null,
    ijazah: null,
    skl_mutasi: null,
    payment_proof: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [fieldName]: e.target.files![0] }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    if (currentStep === 1) {
      if (!formData.full_name || !formData.birth_place || !formData.birth_date || !formData.child_order || !formData.nisn || !formData.entry_class || !formData.previous_school) {
        setError('Harap lengkapi semua data wajib (*) pada form Data Santri.');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.father_name || !formData.father_job || !formData.father_birth_place || !formData.father_birth_date || !formData.father_phone || 
          !formData.mother_name || !formData.mother_job || !formData.mother_birth_place || !formData.mother_birth_date || !formData.mother_phone) {
        setError('Harap lengkapi semua data wajib (*) pada form Data Orang Tua.');
        return false;
      }
    } else if (currentStep === 3) {
      if (!files.kartu_keluarga || !files.ktp_orang_tua || !files.akta_kelahiran || !files.kartu_nisn || !files.transkrip_nilai || !files.ijazah) {
        setError('Harap unggah semua dokumen wajib (*).');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    setError('');
    if (validateStep(step)) {
      if (step < 4) setStep(step + 1);
      window.scrollTo(0, 0); // Scroll to top on step change
    }
  };

  const prevStep = () => {
    setError('');
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Nomor rekening disalin!');
  };

  const handleSubmit = async () => {
    setError('');
    
    // Validate step 4
    if (!formData.sender_account_name || !formData.transfer_date || !files.payment_proof) {
      setError('Harap isi nama pengirim, tanggal transfer, dan unggah bukti transfer.');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      
      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      // Append files
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          data.append(key, file);
        }
      });

      const response = await submitPublicRegistration(data);
      
      if (response.success) {
        setRegNumber(response.data.registration_number);
        setAccessCode(response.data.access_code);
        setStep(5); // Move to success step
        window.scrollTo(0, 0);
      }
    } catch (err: any) {
      setError(err.message || 'Gagal mengirim pendaftaran. Periksa kembali form dan file Anda.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Formulir Pendaftaran Online</h1>
        <p className={styles.heroSubtitle}>
          Satu langkah lagi untuk menjadi santri/santriwati Assuruur. Mari wujudkan impian mencetak generasi muslim yang berakhlak mulia, cerdas, dan berwawasan global. Mulai dengan melengkapi formulir pendaftaran ini.
        </p>
      </section>

      {/* Form Content */}
      <div className={styles.contentWrapper}>
        
        {/* Stepper (Only show if not success step) */}
        {step <= 4 && (
          <div className={styles.stepperCard}>
            {[1, 2, 3, 4].map((s, index) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: s !== 4 ? 1 : 'none' }}>
                <div className={styles.stepItem}>
                  <div className={`${styles.stepNumber} ${step === s ? styles.stepNumberActive : step > s ? styles.stepNumberCompleted : ''}`}>
                    {step > s ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : s}
                  </div>
                  <span className={`${styles.stepLabel} ${step >= s ? styles.stepLabelActive : ''}`}>
                    {s === 1 ? 'Data Santri' : s === 2 ? 'Data Ortu' : s === 3 ? 'Dokumen' : 'Konfirmasi'}
                  </span>
                </div>
                {s !== 4 && <div className={styles.stepDivider}></div>}
              </div>
            ))}
          </div>
        )}

        {/* Error Message Global */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {/* Step 1: Data Santri */}
        {step === 1 && (
          <div className={styles.formCard}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLine}></div>
              <h2 className={styles.sectionTitle}>Data Diri Santri</h2>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroupFull}>
                <label className={styles.label}>Pilih Jenjang Pendaftaran *</label>
                <div className={styles.radioBoxGroup}>
                  <label className={`${styles.radioBoxLabel} ${formData.registration_level === 'SMP' ? styles.radioBoxLabelActive : ''}`}>
                    <input type="radio" name="registration_level" value="SMP" checked={formData.registration_level === 'SMP'} onChange={handleInputChange} className={styles.radioInput} />
                    Jenjang SMP / MTs
                  </label>
                  <label className={`${styles.radioBoxLabel} ${formData.registration_level === 'SMA' ? styles.radioBoxLabelActive : ''}`}>
                    <input type="radio" name="registration_level" value="SMA" checked={formData.registration_level === 'SMA'} onChange={handleInputChange} className={styles.radioInput} />
                    Jenjang SMA / MA
                  </label>
                </div>
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.label}>Nama Lengkap *</label>
                <input type="text" name="full_name" value={formData.full_name} onChange={handleInputChange} placeholder="Masukkan Nama Lengkap" className={styles.inputUnderline} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Tempat Lahir *</label>
                <input type="text" name="birth_place" value={formData.birth_place} onChange={handleInputChange} placeholder="Cth: Bandung" className={styles.inputUnderline} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Tanggal Lahir *</label>
                <input type="date" name="birth_date" value={formData.birth_date} onChange={handleInputChange} className={styles.inputUnderline} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Jenis Kelamin *</label>
                <div className={styles.radioGroup} style={{ marginTop: '0.5rem' }}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="gender" value="LAKI_LAKI" checked={formData.gender === 'LAKI_LAKI'} onChange={handleInputChange} /> Laki - Laki
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="gender" value="PEREMPUAN" checked={formData.gender === 'PEREMPUAN'} onChange={handleInputChange} /> Perempuan
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Anak Ke - *</label>
                <input type="number" name="child_order" value={formData.child_order} onChange={handleInputChange} placeholder="Cth: 1" className={styles.inputUnderline} />
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.label}>NISN * (10 Digit)</label>
                <input type="text" name="nisn" value={formData.nisn} onChange={handleInputChange} placeholder="Masukkan NISN" className={styles.inputUnderline} />
              </div>
            </div>

            <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
              <div className={styles.sectionLine}></div>
              <h2 className={styles.sectionTitle}>Data Akademik Asal</h2>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Tingkat Sekolah Asal *</label>
                <select name="academic_level" value={formData.academic_level} onChange={handleInputChange} className={styles.inputUnderline}>
                  <option value="SD">SD</option>
                  <option value="MI">MI</option>
                  <option value="SMP">SMP</option>
                  <option value="MTS">MTS</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Masuk di Kelas *</label>
                <input type="text" name="entry_class" value={formData.entry_class} onChange={handleInputChange} placeholder="Cth: 7" className={styles.inputUnderline} />
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.label}>Nama Sekolah Asal *</label>
                <input type="text" name="previous_school" value={formData.previous_school} onChange={handleInputChange} placeholder="Masukkan Nama Sekolah Asal" className={styles.inputUnderline} />
              </div>
            </div>

            <div className={styles.formActions}>
              <div></div>
              <button className={styles.btnNext} onClick={nextStep}>
                Selanjutnya
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Data Orang Tua */}
        {step === 2 && (
          <div className={styles.formCard}>
            {/* Data Ayah */}
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLine}></div>
              <h2 className={styles.sectionTitle}>Data Ayah</h2>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nama Lengkap Ayah *</label>
                <input type="text" name="father_name" value={formData.father_name} onChange={handleInputChange} placeholder="Masukkan Nama Ayah" className={styles.inputBox} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Pekerjaan Ayah *</label>
                <input type="text" name="father_job" value={formData.father_job} onChange={handleInputChange} placeholder="Pekerjaan Ayah" className={styles.inputBox} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Tempat Lahir Ayah *</label>
                <input type="text" name="father_birth_place" value={formData.father_birth_place} onChange={handleInputChange} placeholder="Tempat Lahir" className={styles.inputBox} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Tanggal Lahir Ayah *</label>
                <input type="date" name="father_birth_date" value={formData.father_birth_date} onChange={handleInputChange} className={styles.inputBox} />
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.label}>Nomor Telepon Ayah *</label>
                <input type="text" name="father_phone" value={formData.father_phone} onChange={handleInputChange} placeholder="Cth: 08123456789" className={styles.inputBox} />
              </div>
            </div>

            {/* Data Ibu */}
            <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
              <div className={styles.sectionLine}></div>
              <h2 className={styles.sectionTitle}>Data Ibu</h2>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nama Lengkap Ibu *</label>
                <input type="text" name="mother_name" value={formData.mother_name} onChange={handleInputChange} placeholder="Masukkan Nama Ibu" className={styles.inputBox} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Pekerjaan Ibu *</label>
                <input type="text" name="mother_job" value={formData.mother_job} onChange={handleInputChange} placeholder="Pekerjaan Ibu" className={styles.inputBox} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Tempat Lahir Ibu *</label>
                <input type="text" name="mother_birth_place" value={formData.mother_birth_place} onChange={handleInputChange} placeholder="Tempat Lahir" className={styles.inputBox} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Tanggal Lahir Ibu *</label>
                <input type="date" name="mother_birth_date" value={formData.mother_birth_date} onChange={handleInputChange} className={styles.inputBox} />
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.label}>Nomor Telepon Ibu *</label>
                <input type="text" name="mother_phone" value={formData.mother_phone} onChange={handleInputChange} placeholder="Cth: 08123456789" className={styles.inputBox} />
              </div>
            </div>

            <div className={styles.formActions}>
              <button className={styles.btnPrimaryActive} onClick={prevStep}>Sebelumnya</button>
              <button className={styles.btnNext} onClick={nextStep}>
                Selanjutnya
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Upload Dokumen */}
        {step === 3 && (
          <div className={styles.formCard}>
            <div className={styles.guideBox}>
              <h3 className={styles.guideTitle}>Panduan Berkas</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem' }}>
                Format yang didukung: PDF, JPG, PNG. Ukuran maksimal 2MB per file.
              </p>
            </div>

            <div className={styles.sectionHeader}>
              <div className={styles.sectionLine}></div>
              <h2 className={styles.sectionTitle}>Upload Berkas Administrasi</h2>
            </div>

            <div className={styles.uploadGrid}>
              {[
                { id: 'kartu_keluarga', title: 'Kartu Keluarga (KK) *' },
                { id: 'ktp_orang_tua', title: 'KTP Orang Tua *' },
                { id: 'akta_kelahiran', title: 'Akta Kelahiran *' },
                { id: 'kartu_nisn', title: 'Kartu NISN / KIA *' },
                { id: 'transkrip_nilai', title: 'Transkrip Nilai *' },
                { id: 'ijazah', title: 'Ijazah *' },
                { id: 'skl_mutasi', title: 'SKL / Surat Mutasi (Opsional)' },
              ].map((doc) => (
                <div key={doc.id} className={styles.uploadCard}>
                  <h3 className={styles.uploadTitle}>{doc.title}</h3>
                  <div className={styles.uploadActionWrapper}>
                    <input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png" 
                      onChange={(e) => handleFileChange(e, doc.id)} 
                      className={styles.fileInput}
                    />
                    {files[doc.id] ? (
                      <div style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 600 }}>✓ {files[doc.id]?.name}</div>
                    ) : (
                      <div className={styles.uploadAction}>Pilih File</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.formActions}>
              <button className={styles.btnPrimaryActive} onClick={prevStep}>Sebelumnya</button>
              <button className={styles.btnNext} onClick={nextStep}>
                Selanjutnya
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Konfirmasi Pembayaran */}
        {step === 4 && (
          <div>
            <div className={styles.confirmHeader}>
              <h2 className={styles.confirmTitle}>Konfirmasi & Pembayaran</h2>
              <p className={styles.confirmSubtitle}>Silakan tinjau rincian biaya pendaftaran dan lakukan pembayaran untuk menyelesaikan proses registrasi santri baru.</p>
            </div>

            <div className={styles.confirmLayout}>
              <div className={styles.confirmLeft}>
                <div className={styles.sectionHeader} style={{ marginBottom: '1.5rem' }}>
                  <div className={styles.sectionLine}></div>
                  <h3 className={styles.sectionTitle}>Detail Biaya Pendaftaran</h3>
                </div>
                
                <div className={styles.feeItem}>
                  <span>Uang Pendaftaran</span>
                  <span>Rp. 300.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Uang Pangkal + Meja Bangku</span>
                  <span>Rp. 500.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Sumbangan Pembangunan</span>
                  <span>Rp. 2.500.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Wakaf Tanah</span>
                  <span>Rp. 1.000.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Lab. Bahasa</span>
                  <span>Rp. 100.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Perpustakaan</span>
                  <span>Rp. 100.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Iuran OPPM Assuruur</span>
                  <span>Rp. 50.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Uang Komputer 1 Tahun</span>
                  <span>Rp. 200.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Lemari</span>
                  <span>Rp. 900.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Kasur</span>
                  <span>Rp. 200.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Uang bulan pertama (uang makan & SPP)</span>
                  <span>Rp. 600.000</span>
                </div>

                <div className={styles.feeItemBold} style={{ marginTop: '1rem' }}>
                  <span>Total Pembayaran</span>
                  <span className={styles.feeTotal}>Rp. 6.500.000</span>
                </div>
              </div>

              <div className={styles.confirmRight}>
                <div className={styles.sectionHeader} style={{ marginBottom: '1.5rem' }}>
                  <div className={styles.sectionLine}></div>
                  <h3 className={styles.sectionTitle}>Metode Pembayaran Transfer Bank</h3>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  Silakan transfer nominal di atas ke salah satu rekening resmi Pondok Pesantren Modern Assuruur berikut:
                </p>

                <div className={styles.bankCard}>
                  <div className={styles.bankCardTitle}>Bank BRI</div>
                  <div className={styles.bankCardAccWrapper}>
                    <div className={styles.bankCardAcc}>0895 0103 0241 534</div>
                    <button type="button" className={styles.copyButton} onClick={() => handleCopy('089501030241534')} title="Salin Rekening">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  </div>
                  <div className={styles.bankCardName}>A.N PONPES ASSURUUR</div>
                </div>

                <div className={styles.bankCard}>
                  <div className={styles.bankCardTitle}>Bank BJB</div>
                  <div className={styles.bankCardAccWrapper}>
                    <div className={styles.bankCardAcc}>006 405 744 81 00</div>
                    <button type="button" className={styles.copyButton} onClick={() => handleCopy('0064057448100')} title="Salin Rekening">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  </div>
                  <div className={styles.bankCardName}>A.N PONPES ASSURUUR</div>
                </div>
              </div>
            </div>

            {/* Bottom Form Card for Payment Confirmation */}
            <div className={styles.formCard}>
              <div className={styles.sectionHeader} style={{ marginBottom: '1.5rem' }}>
                <div className={styles.sectionLine}></div>
                <h3 className={styles.sectionTitle}>Konfirmasi Pembayaran</h3>
              </div>

              <div className={styles.formGroup} style={{ marginBottom: '1.5rem' }}>
                <label className={styles.label}>Nama Pengirim Rekening *</label>
                <input type="text" name="sender_account_name" value={formData.sender_account_name} onChange={handleInputChange} placeholder="Masukkan Nama Lengkap" className={styles.inputBox} />
              </div>

              <div className={styles.formGroup} style={{ marginBottom: '1.5rem' }}>
                <label className={styles.label}>Tanggal Transfer *</label>
                <input type="date" name="transfer_date" value={formData.transfer_date} onChange={handleInputChange} className={styles.inputBox} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Unggah Bukti Transfer *</label>
                <div className={styles.uploadDashed}>
                  <input 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png" 
                    onChange={(e) => handleFileChange(e, 'payment_proof')} 
                    className={styles.fileInput}
                  />
                  {files.payment_proof ? (
                    <div style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: 'bold' }}>✓ {files.payment_proof.name}</div>
                  ) : (
                    <div>Upload File</div>
                  )}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 'bold', marginTop: '0.5rem' }}>
                  *Format: JPG, PNG, PDF (Max. 2MB)
                </div>
              </div>

              <div className={styles.formActions} style={{ marginTop: '2rem' }}>
                <button className={styles.btnPrimaryActive} onClick={prevStep} disabled={loading}>Sebelumnya</button>
                <button className={styles.btnSubmit} onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
                  {!loading && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className={styles.successCard}>
            <div className={styles.successIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h2 className={styles.successTitle}>Pendaftaran Berhasil!</h2>
            <p className={styles.successSubtitle}>Alhamdulillah, data pendaftaran Anda telah berhasil kami terima dan sedang menunggu verifikasi admin.</p>
            
            <div className={styles.credentialBox}>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Simpan informasi di bawah ini untuk mengecek status pendaftaran Anda:</p>
              
              <div className={styles.credItem}>
                <span className={styles.credLabel}>Nomor Pendaftaran:</span>
                <span className={styles.credValue}>{regNumber}</span>
                <button className={styles.copyBtnSm} onClick={() => handleCopy(regNumber)}>Salin</button>
              </div>
              
              <div className={styles.credItem}>
                <span className={styles.credLabel}>Kode Akses:</span>
                <span className={styles.credValue}>{accessCode}</span>
                <button className={styles.copyBtnSm} onClick={() => handleCopy(accessCode)}>Salin</button>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link href="/cek-status" className={styles.btnCheckStatus}>
                Cek Status Sekarang
              </Link>
              <Link href="/" className={styles.btnHomeOutline}>
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
