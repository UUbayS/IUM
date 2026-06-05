import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      {/* Navbar */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoImg}>
            {/* Logo placeholder */}
            <svg viewBox="0 0 24 24" fill="#0f172a">
              <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/>
            </svg>
          </div>
          <div className={styles.logoText}>ASSURUUR</div>
        </div>
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>Home</a>
          <a href="#" className={styles.navLink}>Profile</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
          <Link href="/daftar" className={styles.btnPrimary}>Daftar Sekarang</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <Image 
          src="/hero_background.png" 
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
              src="/scout_students.png" 
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
      <section className={styles.programsSection}>
        <h2 className={styles.sectionTitle}>Program Unggulan</h2>
        <div className={styles.programsGrid}>
          <div className={styles.programCard}>
            <div className={styles.programIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <h3>Bahasa Asing</h3>
            <p>Mengoptimalkan Arab dan Bahasa Inggris santri aktif dan pasif.</p>
          </div>
          <div className={styles.programCard}>
            <div className={styles.programIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
            <h3>Tahfidzul Qur&apos;an</h3>
            <p>Program hafalan Al-Qur&apos;an terstruktur dan mutqin dengan target capaian jelas.</p>
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
            <p>Pelatihan public speaking dan keilmuan agama untuk menjadi da&apos;i millenial.</p>
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
                <span className={styles.scheduleDesc}>Bangun tidur, shalat tahajud, tilawah Al-Qur&apos;an, persiapan jamaah shalat subuh di masjid</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>05:30</span>
                <span className={styles.scheduleDesc}>Mengaji Kepesantrenan / Olahraga</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>06:00</span>
                <span className={styles.scheduleDesc}>Persiapan Masuk Kelas</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>07:00</span>
                <span className={styles.scheduleDesc}>Shalat Dhuha dan Masuk Kelas</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>08:00</span>
                <span className={styles.scheduleDesc}>Istirahat, Makan Pagi</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>09:30</span>
                <span className={styles.scheduleDesc}>Masuk Kelas</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>12:00</span>
                <span className={styles.scheduleDesc}>Shalat Dzuhur dan Istirahat</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>13:00</span>
                <span className={styles.scheduleDesc}>Masuk Kelas Siang</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>15:00</span>
                <span className={styles.scheduleDesc}>Shalat Ashar</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>15:30</span>
                <span className={styles.scheduleDesc}>Olahraga, Kursus, Mandi Sore</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>17:00</span>
                <span className={styles.scheduleDesc}>Persiapan jamaah maghrib</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>18:00</span>
                <span className={styles.scheduleDesc}>Shalat Maghrib, Baca Qur&apos;an</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>19:00</span>
                <span className={styles.scheduleDesc}>Makan Malam</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>20:00</span>
                <span className={styles.scheduleDesc}>Belajar Malam Terbimbing (Muwajjah)</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>21:30</span>
                <span className={styles.scheduleDesc}>Tidur Malam</span>
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
                <span className={styles.scheduleDesc}>Latihan Pidato 3 Bahasa (Muhadharah)</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>Senin</span>
                <span className={styles.scheduleDesc}>Puasa Sunah Senin Kamis, Lari Pagi bersama</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>Selasa</span>
                <span className={styles.scheduleDesc}>Ekstrakurikuler Pilihan (Pramuka dll)</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>Kamis</span>
                <span className={styles.scheduleDesc}>Puasa Sunah, Lari Pagi, Latihan Pidato</span>
              </li>
              <li className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>Jumat</span>
                <span className={styles.scheduleDesc}>Muhadharah (Khotbah Jumat), Lari pagi / Olahraga Sunah</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <h3>Tentang Kami</h3>
            <p>Pondok Pesantren Assuruur mendidik generasi rabbani yang bertaqwa, cerdas, dan berakhlak mulia. Kami berkomitmen menyelenggarakan pendidikan Islam terpadu yang memadukan kurikulum pesantren dan nasional untuk mencetak kader ulama dan pemimpin masa depan.</p>
          </div>
          <div className={styles.footerCol}>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className={styles.socialIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a href="#" className={styles.socialIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
            </div>
          </div>
          <div className={styles.footerCol}>
            <h3>Informasi Kontak</h3>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <span>Jl. Rancaekek No.3, Bojongloa, Kec. Rancaekek, Kabupaten Bandung, Jawa Barat 40382</span>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <span>0812-3456-7890</span>
            </div>
          </div>
        </div>
        <div className={styles.footerCopyright}>
          &copy; {new Date().getFullYear()} Pondok Pesantren Modern ASSURUUR. All rights reserved.
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a href="#" className={styles.whatsappFloat}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>
    </main>
  );
}
