import Link from "next/link";
import Image from "next/image";
import styles from "@/app/page.module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image 
          src="/logo.png" 
          alt="Logo Assuruur" 
          width={200} 
          height={50} 
          style={{ objectFit: 'contain' }}
        />
      </Link>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/#profile" className={styles.navLink}>Profile</Link>
        <Link href="/#contact" className={styles.navLink}>Contact</Link>
        <Link href="/daftar" className={styles.btnPrimary}>Daftar Sekarang</Link>
      </nav>
    </header>
  );
}
