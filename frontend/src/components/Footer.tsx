import styles from "@/app/page.module.css";

export default function Footer() {
  return (
    <>
      <footer id="contact" className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <h3>Tentang Kami</h3>
            <p>Pondok Pesantren Assuruur berdedikasi untuk memberikan pendidikan terbaik yang mengintegrasikan ilmu kepesantrenan dengan ilmu pengetahuan umum. Kami berkomitmen mencetak generasi santri yang menguasai bahasa Arab dan Inggris, hafal Al-Qur'an, serta berakhlak mulia dalam lingkungan yang disiplin dan kondusif bagi perkembangan peserta didik.</p>
          </div>
          <div className={styles.footerCol}>
            <div className={styles.socialIcons}>
              <a href="https://www.instagram.com/assuruur_ponpes?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.youtube.com/@AssuruurChannel" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a href="https://tiktok.com/@assuruur_ponpes" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
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
              <span>Jl. Sindangreret No.72, RT.04/RW.08, Sukasari, Kec. Pameungpeuk, Kabupaten Bandung, Jawa Barat 40376</span>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <span>0812 1476 1245 (Ust Heru)</span>
            </div>
          </div>
        </div>
        <div className={styles.footerCopyright}>
          &copy; {new Date().getFullYear()} Pondok Pesantren Modern ASSURUUR. All rights reserved.
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a href="https://wa.me/6281214761245" target="_blank" rel="noopener noreferrer" className={styles.whatsappFloat}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>
    </>
  );
}
