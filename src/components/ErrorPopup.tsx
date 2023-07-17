import { Popup } from './Popup';
type ErrorPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
};
const ErrorPopup = ({ isOpen, onClose, errorMessage }: ErrorPopupProps) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <p>{errorMessage}</p>
    </Popup>
  );
};
export default ErrorPopup;
