"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import sharedStyles from "../page.module.css";
import styles from "./page.module.css";

export default function Daftar() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

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
        {/* Stepper */}
        <div className={styles.stepperCard}>
          <div className={styles.stepItem}>
            <div className={`${styles.stepNumber} ${step === 1 ? styles.stepNumberActive : step > 1 ? styles.stepNumberCompleted : ''}`}>
              {step > 1 ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : '1'}
            </div>
            <span className={`${styles.stepLabel} ${step >= 1 ? styles.stepLabelActive : ''}`}>Data Santri</span>
          </div>
          <div className={styles.stepDivider}></div>
          <div className={styles.stepItem}>
            <div className={`${styles.stepNumber} ${step === 2 ? styles.stepNumberActive : step > 2 ? styles.stepNumberCompleted : ''}`}>
              {step > 2 ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : '2'}
            </div>
            <span className={`${styles.stepLabel} ${step >= 2 ? styles.stepLabelActive : ''}`}>Data Orang Tua</span>
          </div>
          <div className={styles.stepDivider}></div>
          <div className={styles.stepItem}>
            <div className={`${styles.stepNumber} ${step === 3 ? styles.stepNumberActive : step > 3 ? styles.stepNumberCompleted : ''}`}>
              {step > 3 ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : '3'}
            </div>
            <span className={`${styles.stepLabel} ${step >= 3 ? styles.stepLabelActive : ''}`}>Unggah Dokumen</span>
          </div>
          <div className={styles.stepDivider}></div>
          <div className={styles.stepItem}>
            <div className={`${styles.stepNumber} ${step === 4 ? styles.stepNumberActive : ''}`}>4</div>
            <span className={`${styles.stepLabel} ${step === 4 ? styles.stepLabelActive : ''}`}>Konfirmasi</span>
          </div>
        </div>

        {/* Form Form */}
        {step < 4 && (
          <div className={styles.formCard}>
            {step === 1 && (
            <>
              {/* Section 1: Data Diri Santri */}
              <div className={styles.sectionHeader}>
                <div className={styles.sectionLine}></div>
                <h2 className={styles.sectionTitle}>Data Diri Santri</h2>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan Nama Lengkap" className={styles.inputUnderline} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Tempat Lahir</label>
                  <div style={{ display: 'flex' }}>
                    <input type="text" placeholder="Cth: Bandung" className={styles.inputUnderline} style={{ width: '100%' }} />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Tanggal Lahir</label>
                  <div className={styles.dateInputContainer}>
                    <input type="text" placeholder="DD/MM/YY" className={styles.inputUnderline} />
                    <svg className={styles.dateIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Jenis Kelamin</label>
                  <div className={styles.radioGroup} style={{ marginTop: '0.5rem' }}>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="gender" className={styles.radioInput} defaultChecked /> Laki - Laki
                    </label>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="gender" className={styles.radioInput} /> Perempuan
                    </label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>&nbsp;</label> {/* Empty label for alignment */}
                  <div className={styles.rowInputs}>
                    <span>Anak Ke -</span>
                    <input type="text" className={styles.inputUnderline} style={{ width: '50px', textAlign: 'center' }} />
                    <span>dari</span>
                    <input type="text" className={styles.inputUnderline} style={{ width: '50px', textAlign: 'center' }} />
                    <span>saudara</span>
                  </div>
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>NISN</label>
                  <input type="text" placeholder="Masukkan Nomor Induk Siswa Nasional" className={styles.inputUnderline} />
                </div>
              </div>

              {/* Section 2: Data Akademik */}
              <div className={styles.sectionHeader} style={{ marginTop: '1rem' }}>
                <div className={styles.sectionLine}></div>
                <h2 className={styles.sectionTitle}>Data Akademik</h2>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Pilihan Tingkat</label>
                  <div className={styles.radioBoxGroup}>
                    <label className={`${styles.radioBoxLabel} ${styles.radioBoxLabelActive}`}>
                      <input type="radio" name="tingkat" className={styles.radioInput} defaultChecked />
                      Madrasah Tsanawiyah
                    </label>
                    <label className={styles.radioBoxLabel}>
                      <input type="radio" name="tingkat" className={styles.radioInput} />
                      Madrasah Aliyah
                    </label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Masuk di Kelas</label>
                  <input type="text" placeholder="Pilih Kelas" className={styles.inputUnderline} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Sekolah Asal</label>
                  <input type="text" placeholder="Masukkan Nama Sekolah Asal" className={styles.inputUnderline} />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Section Data Ayah */}
              <div className={styles.sectionHeader}>
                <div className={styles.sectionLine}></div>
                <h2 className={styles.sectionTitle}>Data Ayah</h2>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan Nama Lengkap" className={styles.inputBox} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Pekerjaan</label>
                  <input type="text" placeholder="Masukkan Pekerjaan Ayahanda" className={styles.inputBox} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Tempat Lahir</label>
                  <input type="text" placeholder="Cth: Bandung" className={styles.inputBox} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Tanggal Lahir</label>
                  <div className={styles.dateInputContainer}>
                    <input type="text" placeholder="DD/MM/YY" className={styles.inputBox} />
                    <svg className={styles.dateIconBox} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Nomor Telepon</label>
                  <input type="text" placeholder="Cth: +6281xxxxxxxx" className={styles.inputBox} />
                </div>
              </div>

              {/* Section Data Ibu */}
              <div className={styles.sectionHeader} style={{ marginTop: '1rem' }}>
                <div className={styles.sectionLine}></div>
                <h2 className={styles.sectionTitle}>Data Ibu</h2>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan Nama Lengkap" className={styles.inputBox} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Pekerjaan</label>
                  <input type="text" placeholder="Masukkan Pekerjaan Ibunda" className={styles.inputBox} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Tempat Lahir</label>
                  <input type="text" placeholder="Cth: Bandung" className={styles.inputBox} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Tanggal Lahir</label>
                  <div className={styles.dateInputContainer}>
                    <input type="text" placeholder="DD/MM/YY" className={styles.inputBox} />
                    <svg className={styles.dateIconBox} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Nomor Telepon</label>
                  <input type="text" placeholder="Cth: +6281xxxxxxxx" className={styles.inputBox} />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {/* Panduan Berkas */}
              <div className={styles.guideBox}>
                <h3 className={styles.guideTitle}>Panduan Berkas</h3>
                <div className={styles.guideList}>
                  <div className={styles.guideItem}>
                    <div className={styles.guideIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    </div>
                    <div className={styles.guideText}>Pastikan dokumen dipindai (scan) secara jelas dan tidak terpotong. Format yang didukung: PDF, JPG, PNG.</div>
                  </div>
                  <div className={styles.guideItem}>
                    <div className={styles.guideIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <div className={styles.guideText}>Format yang didukung: PDF, JPG, PNG dan ukuran maksimal setiap file adalah 1 MB.</div>
                  </div>
                  <div className={styles.guideItem}>
                    <div className={styles.guideIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                    </div>
                    <div className={styles.guideText}>Gunakan dokumen asli, bukan fotokopi yang dilegalisir (kecuali Ijazah asli belum terbit).</div>
                  </div>
                </div>
              </div>

              {/* Upload Berkas Administrasi */}
              <div className={styles.sectionHeader}>
                <div className={styles.sectionLine}></div>
                <h2 className={styles.sectionTitle}>Upload Berkas Administrasi</h2>
              </div>

              <div className={styles.uploadGrid}>
                {/* KK */}
                <div className={styles.uploadCard}>
                  <div className={styles.uploadHeader}>
                    <div className={styles.uploadIcon}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <div className={styles.uploadLimit}>Maks 2MB</div>
                  </div>
                  <h3 className={styles.uploadTitle}>Kartu Keluarga (KK)</h3>
                  <p className={styles.uploadDesc}>Unggah halaman depan seluruh anggota</p>
                  <div className={styles.uploadAction}>Upload File</div>
                  <svg className={styles.uploadActionIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </div>

                {/* KTP Ortu */}
                <div className={styles.uploadCard}>
                  <div className={styles.uploadHeader}>
                    <div className={styles.uploadIcon}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                    <div className={styles.uploadLimit}>Maks 2MB</div>
                  </div>
                  <h3 className={styles.uploadTitle}>KTP Orang Tua</h3>
                  <p className={styles.uploadDesc}>Pastikan nomor NIK terlihat jelas</p>
                  <div className={styles.uploadAction}>Upload File</div>
                  <svg className={styles.uploadActionIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </div>

                {/* Akte */}
                <div className={styles.uploadCard}>
                  <div className={styles.uploadHeader}>
                    <div className={styles.uploadIcon}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    </div>
                    <div className={styles.uploadLimit}>Maks 2MB</div>
                  </div>
                  <h3 className={styles.uploadTitle}>Akte Kelahiran - PDF</h3>
                  <p className={styles.uploadDesc}>Pastikan data terlihat jelas</p>
                  <div className={styles.uploadAction}>Upload File</div>
                  <svg className={styles.uploadActionIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </div>

                {/* KTP Santri */}
                <div className={styles.uploadCard}>
                  <div className={styles.uploadHeader}>
                    <div className={styles.uploadIcon}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                    <div className={styles.uploadLimit}>Maks 1MB (per file)</div>
                  </div>
                  <h3 className={styles.uploadTitle}>KTP / NISN Santri / KIA</h3>
                  <p className={styles.uploadDesc}>Pastikan data terlihat jelas</p>
                  <div className={styles.uploadAction}>Upload File</div>
                  <svg className={styles.uploadActionIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </div>

                {/* Transkrip */}
                <div className={styles.uploadCard}>
                  <div className={styles.uploadHeader}>
                    <div className={styles.uploadIcon}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <div className={styles.uploadLimit}>Maks 2MB</div>
                  </div>
                  <h3 className={styles.uploadTitle}>Transkrip Calon Santri - PDF</h3>
                  <p className={styles.uploadDesc}>Pastikan data terlihat jelas</p>
                  <div className={styles.uploadAction}>Upload File</div>
                  <svg className={styles.uploadActionIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </div>

                {/* Ijazah */}
                <div className={styles.uploadCard}>
                  <div className={styles.uploadHeader}>
                    <div className={styles.uploadIcon}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                    </div>
                    <div className={styles.uploadLimit}>Maks 2MB</div>
                  </div>
                  <h3 className={styles.uploadTitle}>Ijazah Calon Santri - PDF</h3>
                  <p className={styles.uploadDesc}>Pastikan data terlihat jelas</p>
                  <div className={styles.uploadAction}>Upload File</div>
                </div>

                {/* SKL */}
                <div className={styles.uploadCard}>
                  <div className={styles.uploadHeader}>
                    <div className={styles.uploadIcon}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <div className={styles.uploadLimit}>Maks 1MB</div>
                  </div>
                  <h3 className={styles.uploadTitle}>Scan SKL / Surat Mutasi Jika Pindahan Asli</h3>
                  <p className={styles.uploadDesc}>Pastikan data terlihat jelas</p>
                  <div className={styles.uploadAction}>Upload File</div>
                  <svg className={styles.uploadActionIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </div>
              </div>
            </>
          )}

          <div className={styles.formActions}>
            <button 
              className={step === 1 ? styles.btnBack : styles.btnPrimaryActive} 
              disabled={step === 1}
              onClick={prevStep}
            >
              Sebelumnya
            </button>
            <button className={styles.btnNext} onClick={nextStep}>
              Selanjutnya
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>
        )}

        {step === 4 && (
          <div>
            <div className={styles.confirmHeader}>
              <h2 className={styles.confirmTitle}>Konfirmasi & Pembayaran</h2>
              <p className={styles.confirmSubtitle}>Silakan tinjau rincian biaya pendaftaran dan lakukan pembayaran untuk menyelesaikan proses registrasi santri baru.</p>
            </div>

            <div className={styles.confirmLayout}>
              <div className={styles.confirmLeft}>
                <div className={styles.sectionHeader} style={{ marginBottom: '1rem' }}>
                  <div className={styles.sectionLine}></div>
                  <h3 className={styles.sectionTitle}>Detail Biaya Pendaftaran</h3>
                </div>
                
                <div className={styles.feeItem}>
                  <span>Uang Pendaftaran</span>
                  <span style={{ fontWeight: 'bold' }}>Rp. 300.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Uang Pangkal + Meja Bangku</span>
                  <span style={{ fontWeight: 'bold' }}>Rp. 500.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Sumbangan Pembangunan</span>
                  <span style={{ fontWeight: 'bold' }}>Rp. 2.500.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Wakaf Tanah</span>
                  <span style={{ fontWeight: 'bold' }}>Rp. 1.000.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Lab. Bahasa</span>
                  <span style={{ fontWeight: 'bold' }}>Rp. 100.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Perpustakaan</span>
                  <span style={{ fontWeight: 'bold' }}>Rp. 100.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Iuran OPPM Assuruur</span>
                  <span style={{ fontWeight: 'bold' }}>Rp. 50.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Uang Komputer 1 Tahun</span>
                  <span style={{ fontWeight: 'bold' }}>Rp. 200.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Lemari</span>
                  <span style={{ fontWeight: 'bold' }}>Rp. 900.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Kasur</span>
                  <span style={{ fontWeight: 'bold' }}>Rp. 200.000</span>
                </div>
                <div className={styles.feeItem}>
                  <span>Uang bulan pertama (uang makan & SPP)</span>
                  <span style={{ fontWeight: 'bold' }}>Rp. 600.000</span>
                </div>

                <div className={styles.feeItemBold}>
                  <span>Total Pembayaran</span>
                  <span className={styles.feeTotal}>Rp. 6.500.000</span>
                </div>
              </div>

              <div className={styles.confirmRight}>
                <div className={styles.sectionHeader} style={{ marginBottom: '1rem', alignItems: 'flex-start' }}>
                  <div className={styles.sectionLine}></div>
                  <h3 className={styles.sectionTitle}>Metode Pembayaran Transfer Bank</h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.5' }}>Silakan transfer nominal di atas ke salah satu rekening resmi Pondok Pesantren Modern Assuruur berikut:</p>

                <div className={styles.bankCard}>
                  <div className={styles.bankCardTitle}>Bank BRI</div>
                  <div className={styles.bankCardAccWrapper}>
                    <div className={styles.bankCardAcc}>0895 0103 0241 534</div>
                    <button className={styles.copyButton} onClick={() => handleCopy('089501030241534')} title="Salin nomor rekening">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  </div>
                  <div className={styles.bankCardName}>A/N PONPES ASSURUUR</div>
                </div>

                <div className={styles.bankCard}>
                  <div className={styles.bankCardTitle}>Bank BJB</div>
                  <div className={styles.bankCardAccWrapper}>
                    <div className={styles.bankCardAcc}>006 405 744 81 00</div>
                    <button className={styles.copyButton} onClick={() => handleCopy('0064057448100')} title="Salin nomor rekening">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  </div>
                  <div className={styles.bankCardName}>A/N PONPES ASSURUUR</div>
                </div>
              </div>
            </div>

            <div className={styles.formCard}>
              <div className={styles.sectionHeader} style={{ marginBottom: '1.5rem' }}>
                <div className={styles.sectionLine}></div>
                <h3 className={styles.sectionTitle}>Konfirmasi Pembayaran</h3>
              </div>

              <div className={styles.formGroup} style={{ marginBottom: '1.5rem' }}>
                <label className={styles.label}>Nama Pengirim Rekening</label>
                <input type="text" placeholder="Masukkan Nama Lengkap" className={styles.inputUnderline} />
              </div>

              <div className={styles.formGroup} style={{ marginBottom: '1.5rem' }}>
                <label className={styles.label}>Tanggal Transfer</label>
                <div className={styles.dateInputContainer}>
                  <input type="text" placeholder="DD/MM/YY" className={styles.inputUnderline} />
                  <svg className={styles.dateIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Unggah Bukti Transfer</label>
                <div className={styles.uploadDashed}>Upload File</div>
                <div className={styles.uploadNote}>*Format: JPG, PNG, PDF (Max. 2MB)</div>
              </div>

              <div className={styles.formActions}>
                <button className={styles.btnPrimaryActive} onClick={prevStep}>Sebelumnya</button>
                <button className={styles.btnSubmit}>
                  Kirim Pendaftaran
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
