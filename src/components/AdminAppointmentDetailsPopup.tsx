'use client';

import { useTransition, useState } from 'react';
import { cancelAppointment } from './actions';

// <-- UI -->
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

type AppointmentDescriptionPopupProps = {
  open: boolean;
  onClose: () => void;
  clickedAppointment: Appointment;
};

const AdminAppointmentDetailsPopup = ({
  open,
  onClose,
  clickedAppointment,
}: AppointmentDescriptionPopupProps) => {
  const {
    id,
    first_name,
    last_name,
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

  const [, startTransition] = useTransition();
  const { toast } = useToast();

  const [isAppointmentCancelled, setIsAppointmentCancelled] = useState(
    Boolean(is_cancelled!),
  );

  const handleCancelChange = () => {
    console.log('Change triggered');
    setIsAppointmentCancelled((previousValue) => {
      startTransition(() => {
        cancelAppointment(id!)
          .then(() =>
            toast({
              title: 'Appointment Unbound: Cancelled Successfully!',
              description:
                "The appointment's journey takes a new path as it's officially cancelled.",
            }),
          )
          .catch((error) => {
            console.error('Failed to create appointment:', error);
            toast({
              title:
                'Oops, Scheduling Spells Tangled: Appointment Not Cancelled',
              description:
                'Looks like a scheduling hiccup! The appointment remains untouched.',
            });
          });
      });
      return !previousValue;
    });
  };

  const formatMobilePhone = (phoneNumberString: string) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  };

  const renderStatusBadges = () => {
    const statusList: string[] = [];
    if (is_emergency) {
      statusList.push('Emergency');
    }
    if (is_scheduled && !is_cancelled) {
      statusList.push('Scheduled');
    }
    if (is_cancelled) {
      statusList.push('Cancelled');
    }
    if (!is_scheduled && !is_cancelled) {
      statusList.push('Waiting');
    }

    return statusList.map((status, index) => (
      <Badge key={index} variant="secondary">
        {status}
      </Badge>
    ));
  };

  const renderViewDetailsTabContent = () => (
    <>
      <DialogHeader>
        <DialogTitle className="py-2 text-center text-2xl border-b">
          <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
            Patient Chronicles
          </span>{' '}
          <br />A Peek into the Appointment
        </DialogTitle>
      </DialogHeader>
      <div className="mt-4 px-2 flex gap-4">{renderStatusBadges()}</div>
      <div className="grid gap-2 py-2 px-2">
        <div className="flex gap-4">
          <h3 className="font-bold">Name :</h3>
          <p>{`${first_name} ${last_name}`}</p>
        </div>
        <div className="flex gap-4">
          <h3 className="font-bold">Email: </h3>
          <p>
            <a
              href={`mailto:${email}`}
              className="no-underline transition-all hover:underline ease-in-out"
            >
              {email}
            </a>
          </p>
        </div>
        <div className="flex gap-4">
          <h3 className="font-bold">Contact Number: </h3>
          <p>
            <a
              href={`tel:${mobile_phone}`}
              className="no-underline transition-all hover:underline ease-in-out"
            >
              {formatMobilePhone(mobile_phone)}
            </a>
          </p>
        </div>
        <div className="flex gap-4">
          <h3 className="font-bold">Type of Appointment: </h3>
          <p>
            {appointment_type
              ? `${appointment_type[0].toUpperCase()}${appointment_type.slice(
                  1,
                )}`
              : 'N/A'}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-bold">Description: </h3>
          <p className="ml-2">{description ? description : 'N/A'}</p>
        </div>
        <div className="flex gap-4">
          <h3 className="font-bold">Requested Date: </h3>
          <p>
            {new Date(requested_date!).toLocaleDateString('en-us', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="flex gap-4">
          <h3 className="font-bold">Requested Time: </h3>
          <p>
            {requested_time
              ? `${requested_time[0].toUpperCase()}${requested_time.slice(1)}`
              : ''}
          </p>
        </div>
        <div className="flex gap-4">
          <h3 className="font-bold">Scheduled Date: </h3>
          <p>
            {is_scheduled
              ? new Date(scheduled_date!).toLocaleDateString('en-us', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'N/A'}
          </p>
        </div>
        <div className="flex gap-4">
          <h3 className="font-bold">Who scheduled the appointment?: </h3>
          <p>{scheduled_by ?? 'N/A'}</p>
        </div>
      </div>
    </>
  );

  const renderScheduleTabContent = () => (
    <>
      <DialogHeader>
        <DialogTitle className="py-2 text-center text-2xl border-b">
          <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
            Appointment Artistry
          </span>{' '}
          <br />
          Crafting a Seamless Encounter
        </DialogTitle>
      </DialogHeader>
    </>
  );

  const renderCancelTabContent = () => (
    <>
      <DialogHeader>
        <DialogTitle className="py-2 text-center text-2xl border-b">
          <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
            Shifting Sands
          </span>{' '}
          <br />
          Facilitating Cancellations
        </DialogTitle>
        <div className="py-8">
          <div className="flex items-center gap-2 ">
            <Checkbox
              id="confirm-cancel"
              onCheckedChange={handleCancelChange}
              checked={isAppointmentCancelled}
              disabled={isAppointmentCancelled}
            />
            <label
              htmlFor="confirm-cancel"
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Confirm cancellation of the selected appointment
            </label>
          </div>
          <p className="text-sm text-muted-foreground">
            By checking the box above, the selected appointment will be
            cancelled. Please, confirm with the patient before doing that.
          </p>
        </div>
      </DialogHeader>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[375px] sm:max-w-[540px] text-base rounded-md">
        <Tabs defaultValue="view-details" className="">
          <TabsList>
            <TabsTrigger value="view-details">View Details</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="cancel">Cancel</TabsTrigger>
          </TabsList>
          <TabsContent value="view-details">
            {renderViewDetailsTabContent()}
          </TabsContent>
          <TabsContent value="schedule">
            {renderScheduleTabContent()}
          </TabsContent>
          <TabsContent value="cancel">{renderCancelTabContent()}</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAppointmentDetailsPopup;
