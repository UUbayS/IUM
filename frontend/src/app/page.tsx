import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>


      {/* Hero Section */}
      <section className={styles.hero}>
        <Image 
          src="/ponpes2.png" 
          alt="Santri" 
          fill 
          className={styles.heroBg}
          priority
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroWatermark}>DARUL HUSNA</div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Pondok Pesantren Modern<br/>ASSURUUR</h1>
          <p className={styles.heroSubtitle}>
            Selamat datang di Pondok Pesantren Modern Assuruur. Mari bergabung menuntut ilmu bersama kami, memadukan tradisi keilmuan Islam dan standar pendidikan modern
          </p>
          <Link href="/daftar" className={styles.btnPrimary}>Daftar Sekarang</Link>
        </div>
      </section>

      {/* Mengapa Memilih Kami */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Mengapa Memilih Kami?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featuresImage}>
            <Image 
              src="/ponpes.png" 
              alt="Pramuka Santri" 
              width={500} 
              height={600}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div className={styles.featureText}>
                <h3>Pendidikan Karakter Islami</h3>
                <p>Membentuk akhlaq mulia berlandaskan nilai-nilai Al-Qur&apos;an dan As-Sunnah melalui kebiasaan, keteladanan, dan kedisiplinan dalam kehidupan asrama.</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div className={styles.featureText}>
                <h3>Tenaga Pengajar Profesional</h3>
                <p>Para santri dibimbing dan didampingi secara penuh oleh jajaran asatidz, ustadzah, dan guru yang kompeten, berdedikasi tinggi, serta ahli di bidangnya masing-masing.</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div className={styles.featureText}>
                <h3>Pengembangan Minat dan Bakat</h3>
                <p>Mewadahi beragam potensi santri melalui berbagai kegiatan ekstrakurikuler unggulan, seperti kepramukaan, olahraga, seni Islami, bahasa, dan keterampilan lainnya.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Unggulan */}
      <section id="profile" className={styles.programsSection}>
        <h2 className={styles.sectionTitle}>Program Unggulan</h2>
        <div className={styles.programsGrid}>
          <div className={styles.programCard}>
            <div className={styles.programIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <h3>Bahasa Asing</h3>
            <p>Menguasai Bahasa Arab dan Bahasa Inggris secara aktif dan pasif.</p>
          </div>
          <div className={styles.programCard}>
            <div className={styles.programIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
            <h3>Tahfidzul Qur&apos;an</h3>
            <p>Program hafalan Al-Qur&apos;an terstruktur dengan target capaian yang jelas.</p>
          </div>
          <div className={styles.programCard}>
            <div className={styles.programIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            </div>
            <h3>Lulusan Tembus PTN</h3>
            <p>Pembekalan intensif menuju Perguruan Tinggi Negeri dan Universitas luar negeri.</p>
          </div>
          <div className={styles.programCard}>
            <div className={styles.programIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3>Mencetak Da&apos;i Handal</h3>
            <p>Pelatihan public speaking dan keilmuan agama untuk menjadi pendakwah.</p>
          </div>
        </div>
      </section>

      {/* Jadwal Santri */}
      <section className={styles.scheduleSection}>
        <h2 className={styles.sectionTitle}>Jadwal Santri</h2>
        <div className={styles.scheduleGrid}>
          {/* Harian */}
          <div className={styles.scheduleCard}>
            <div className={styles.scheduleHeader}>
              <div className={styles.scheduleHeaderIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3>Jadwal Kegiatan Harian</h3>
            </div>
            <ul className={styles.scheduleList}>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>03:30</span>
                <span className={styles.scheduleDesc}>Bangun tidur, shalat shubuh, Mengaji Al-Qur&apos;an. Intensifikasi Bahasa Arab dan Inggris.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>05:30</span>
                <span className={styles.scheduleDesc}>Mengulangi Pelajaran dan Olahraga.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>06:00</span>
                <span className={styles.scheduleDesc}>Persiapan Masuk Kelas</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>07:00</span>
                <span className={styles.scheduleDesc}>Sholat Dhuha dan Masuk Kelas.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>09:00</span>
                <span className={styles.scheduleDesc}>Istirahat, Makan Pagi.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>09:30</span>
                <span className={styles.scheduleDesc}>Masuk Kelas.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>12:00</span>
                <span className={styles.scheduleDesc}>Shalat Dzuhur dan istirahat.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>13:00</span>
                <span className={styles.scheduleDesc}>Masuk Kelas Siang.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>15:00</span>
                <span className={styles.scheduleDesc}>Shalat Ashar.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>15:30</span>
                <span className={styles.scheduleDesc}>Olahraga, Kursus, Mandi Sore.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>17:00</span>
                <span className={styles.scheduleDesc}>Pelajaran Sore dan Tahsin Al-Qur&apos;an.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>18:00</span>
                <span className={styles.scheduleDesc}>Shalat Magrib, dan Makan.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>19:00</span>
                <span className={styles.scheduleDesc}>Shalat Isya.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>20:00</span>
                <span className={styles.scheduleDesc}>Belajar Malam Terbimbing (Muwaajah)</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>21:30</span>
                <span className={styles.scheduleDesc}>Tidur Malam.</span>
              </li>
            </ul>
          </div>
          
          {/* Mingguan */}
          <div className={styles.scheduleCard}>
            <div className={styles.scheduleHeader}>
              <div className={styles.scheduleHeaderIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <h3>Jadwal Kegiatan Mingguan</h3>
            </div>
            <ul className={styles.scheduleList}>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>Ahad</span>
                <span className={styles.scheduleDesc}>Latihan Pidato Bahasa Inggris.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>Senin</span>
                <span className={styles.scheduleDesc}>Shaum, Buka Bersama, dan Do&apos;a bersama.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>Selasa</span>
                <span className={styles.scheduleDesc}>Muhadatsah (Percakapan), dan Latihan Pidato Bahasa Arab.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>Kamis</span>
                <span className={styles.scheduleDesc}>Shaum, Pramuka, Do&apos;a, Ta&apos;jil bersama, dan Latihan Pidato Bahasa Indonesia.</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>Jum&apos;at</span>
                <span className={styles.scheduleDesc}>Muhadatsah (Percakapan), Lari pagi, Olahraga &amp; pembersihan Umum.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </main>
  );
}
