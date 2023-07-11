import Image from 'next/image';
import logo from '@public/connectient.png';
import Link from 'next/link';
import styles from '@styles/header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src={logo}
          alt="Connectient logo, icon with two people communicating"
          width={240}
        />
      </Link>
    </header>
  );
};

export default Header;
