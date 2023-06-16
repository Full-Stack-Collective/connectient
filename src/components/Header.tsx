import Image from 'next/image'
import logo from '@public/connectient.png'
import Link from 'next/link'
import styles from '@styles/header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <Image
          src={logo}
          alt="Connectient logo, icon with two people communicating"
          width={240}
        />
      </Link>
    </div>
  )
}

export default Header
