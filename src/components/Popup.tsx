import styles from '@styles/popup.module.css';

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Popup = ({ isOpen, onClose, children }: PopupProps) => {
  return (
    <div className={`${styles.popup} ${isOpen ? styles.opened : ''}`}>
      <div className={styles.popupContainer}>
        {children}
        <button
          className={styles.closeButton}
          aria-label="Close Popup"
          onClick={onClose}
        >
          ✘
        </button>
      </div>
    </div>
  );
};
