'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { capitalizeWord } from '@/utils/utils';
import { Button } from './ui/button';
import { ButtonLoading } from './ui/button-loading';

type AppointmentDetailsPopupProps = {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  createdAppointment: Appointment;
  handleConfirmAppointment: (appointment: Appointment) => void;
};

const AppointmentDetailsPopup = ({
  open,
  onClose,
  isLoading,
  createdAppointment,
  handleConfirmAppointment,
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
  } = createdAppointment;

  const formatTimeOfDay = (appointmentTime: string) => {
    if (!appointmentTime) return 'Unsure';
    if (appointmentTime === 'flexible') return 'Anytime';
    else return capitalizeWord(appointmentTime);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Does this look right?</DialogTitle>
          <DialogDescription>Confirm your details to submit</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>
            <span className="font-semibold">Appointment for: </span>{' '}
            {first_name} {last_name}
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            {email}
          </p>
          <p>
            <span className="font-semibold">Phone: </span> {mobile_phone}
          </p>
          <p>
            <span className="font-semibold">Requested Date: </span>
            {requested_date?.toLocaleDateString('en-us', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <p>
            <span className="font-semibold">Preferred Time: </span>
            {requested_time && formatTimeOfDay(requested_time)}
          </p>
          <p>
            <span className="font-semibold">Procedure: </span>
            {appointment_type && capitalizeWord(appointment_type)}
          </p>
          {description ? (
            <p>
              <span className="font-semibold">Additional Details: </span>
              {capitalizeWord(description)}
            </p>
          ) : null}
          {is_emergency ? <p>This is an emergency</p> : null}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Go Back{' '}
          </Button>
          {isLoading ? (
            <ButtonLoading />
          ) : (
            <Button
              onClick={() => handleConfirmAppointment(createdAppointment)}
            >
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsPopup;
