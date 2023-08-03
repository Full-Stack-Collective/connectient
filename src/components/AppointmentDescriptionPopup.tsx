'use client';

import { useState, useTransition } from 'react';
import {
  emailConfirmationHandler,
  getAppointment,
  updateAppointment,
} from './actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import ConfirmationEmailData from '@/types/ConfirmationEmailData';

type AppointmentDescriptionPopupProps = {
  open: boolean;
  onClose: () => void;
  clickedAppointment: Appointment;
};

const AppointmentDescriptionPopup = ({
  open,
  onClose,
  clickedAppointment,
}: AppointmentDescriptionPopupProps) => {
  const {
    id,
    first_name,
    last_name,
    dob,
    email,
    mobile_phone,
    requested_date,
    requested_time,
    is_emergency,
    description,
    appointment_type,
    is_scheduled,
    scheduled_date,
    scheduled_by,
    is_cancelled,
  } = clickedAppointment;

  const [isChecked, setIsChecked] = useState(is_scheduled);
  const [, startTransition] = useTransition();

  const handleConfirmScheduleChange = () => {
    if (id) {
      setIsChecked((prevValue) => {
        startTransition(async () => {
          await updateAppointment(id, !prevValue);
          if (isChecked === false) {
            const data = await getAppointment(id);
            if (!data) {
              throw new Error('Invalid data.');
            }
            const appFromDB: ConfirmationEmailData = data[0];
            await emailConfirmationHandler(appFromDB);
            console.log(
              'Successfully sent confirmation email for: ',
              appFromDB,
            );
          }
        });
        return !prevValue;
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>Name: {`${first_name} ${last_name}`}</p>
          <p>Date of Birth: {new Date(dob!).toDateString()}</p>
          <p>Email: {email}</p>
          <p>Contact Number: {mobile_phone}</p>
          <p>Is it an Emergency? : {is_emergency ? '✔' : '✘'}</p>
          <p>Appointment Type: {appointment_type ? appointment_type : ''}</p>
          <p>Description: {description ?? 'NA'}</p>
          <p>Requested Date: {new Date(requested_date!).toDateString()}</p>
          <p>Requested Time: {requested_time}</p>
          <p>Has appointment been scheduled? : {is_scheduled ? '✔' : '✘'}</p>
          <p>
            Scheduled Date:{' '}
            {is_scheduled ? new Date(scheduled_date!).toDateString() : 'NA'}
          </p>
          <p>Who scheduled the appointment? : {scheduled_by ?? 'NA'}</p>
          <p>Has appointment been cancelled? : {is_cancelled ? '✔' : '✘'}</p>
          <hr />
          <div className="items-top flex space-x-2">
            <Checkbox
              id="confirm"
              checked={isChecked!}
              onChange={handleConfirmScheduleChange}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="confirm"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Confirm if you have called the patient and scheduled the
                appointment?
              </Label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDescriptionPopup;
