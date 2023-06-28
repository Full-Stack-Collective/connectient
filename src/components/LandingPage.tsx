import Link from 'next/link'
import styles from '@styles/landingPage.module.css'
import dentalScheduling from '@public/dentalScheduling.png'
import Image from 'next/image'

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Image
        src={dentalScheduling}
        alt="image of calendar and fake dentures"
        className={styles.img}
      />
      <h1 className={styles.header}>Welcome to Essential Dental Solutions</h1>
      <p>This is an online appointment request system.</p>
      <p>
        If you are ready, click on &quot;Get Started&quot; below to proceed.
      </p>
      <Link href="/appointments" className={styles.link}>
        Get Started
      </Link>
    </div>
  )
}
export default LandingPage
