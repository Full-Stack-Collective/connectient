import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type ErrorPopupProps = {
  open: boolean;
  onClose: () => void;
  errorMessage: string;
};

const ErrorPopup = ({ open, onClose, errorMessage }: ErrorPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Error!</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>{errorMessage}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorPopup;
