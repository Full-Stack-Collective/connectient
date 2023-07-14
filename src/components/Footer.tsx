import styles from '@styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© Connectient {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
