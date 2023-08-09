'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type AppointmentDetailsPopupProps = {
  open: boolean;
  onClose: () => void;
  appointment: Appointment;
};

const AppointmentDetailsPopup = ({
  open,
  onClose,
  appointment,
}: AppointmentDetailsPopupProps) => {
  const {
    first_name,
    last_name,
    email,
    mobile_phone,
    requested_date,
    requested_time,
    is_emergency,
    description,
    appointment_type,
  } = appointment;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your appointment request was sent!</DialogTitle>
          <DialogDescription>
            You&#8217;ll receive an email shortly with this request information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>
            Name: {first_name} {last_name}
          </p>
          <p>Email: {email}</p>
          <p>Phone: {mobile_phone}</p>
          Requested Appointment Date:{' '}
          {requested_date?.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
          <p>Requested Appointment Time: {requested_time}</p>
          <p>Requested Appointment Type: {appointment_type}</p>
          {description && <p>Description: {description}</p>}
          <p>Emergency: {is_emergency}</p>
        </div>
        <DialogFooter>
          <p>Thank you!</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsPopup;
