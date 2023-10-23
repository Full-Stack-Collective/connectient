'use client';

import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  format,
  parseISO,
  isPast,
  isSunday,
  addMonths,
  addBusinessDays,
  startOfTomorrow,
} from 'date-fns';

import {
  cancelAppointment,
  scheduleAppointment,
  emailConfirmationHandler,
} from './actions';

// <-- UI -->
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import ConfirmationEmailData from '@/types/ConfirmationEmailData';
import PracticeEmailData from '@/types/PracticeEmailData';
import { updateRequestCreatedTime } from '@/utils/times';

type AdminAppointmentDetailsPopupProps = {
  open: boolean;
  onClose: () => void;
  clickedAppointment: Appointment;
  practiceInfo: PracticeEmailData | null;
};

// Define Schedule Appointment Form schema
const formSchema = z.object({
  scheduled_date: z.date({ required_error: 'A date is required' }),
  scheduled_time: z.string().nonempty('A time is required'),
});

const AdminAppointmentDetailsPopup = ({
  open,
  onClose,
  clickedAppointment,
  practiceInfo,
}: AdminAppointmentDetailsPopupProps) => {
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
    scheduled_time,
    scheduled_by,
    is_cancelled,
    created_at,
  } = clickedAppointment;

  const SEVEN_30_AM_IN_MINUTES = 60 * 7.5;
  const FIVE_PM_IN_MINUTES = 60 * 17;
  const INTERVAL_IN_MINUTES = 15;

  const [, startTransition] = useTransition();
  const { toast } = useToast();

  const [isAppointmentCancelled, setIsAppointmentCancelled] = useState(
    Boolean(is_cancelled!),
  );
  const [isAppointmentScheduled, setIsAppointmentScheduled] = useState(
    Boolean(is_scheduled!),
  );
  const [updatedAppointment, setUpdatedAppointment] =
    useState(clickedAppointment);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scheduled_date: isAppointmentScheduled
        ? parseISO(scheduled_date!)
        : addBusinessDays(startOfTomorrow(), 1),
      scheduled_time: isAppointmentScheduled
        ? scheduled_time?.slice(0, -3)
        : '07:30',
    },
    mode: 'onChange',
  });

  const formatMobilePhone = (phoneNumberString: string) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  };

  const generateHoursInterval = (
    startHourInMinute: number,
    endHourInMinute: number,
    interval: number,
  ) => {
    const times = [];

    for (let i = 0; startHourInMinute < 24 * 60; i += 1) {
      if (startHourInMinute > endHourInMinute) break;

      const hh = Math.floor(startHourInMinute / 60); // getting hours of day in 0-24 format

      const mm = startHourInMinute % 60; // getting minutes of the hour in 0-55 format
      const ampm = hh < 12 ? 'AM' : 'PM'; // If hh less than 12, it is AM, otherwise, it is PM
      const hh12 = hh % 12 || 12; //midnight

      times[i] = `${('0' + hh12.toString()).slice(-2)}:${(
        '0' + mm.toString()
      ).slice(-2)} ${ampm}`;

      startHourInMinute = startHourInMinute + interval;
    }

    return times;
  };

  const handleCancelChange = () => {
    startTransition(() => {
      cancelAppointment(id!)
        .then((data) => {
          setUpdatedAppointment(data![0]);
          setIsAppointmentCancelled(true);
          toast({
            title: 'Appointment Unbound: Cancelled Successfully!',
            description:
              "The appointment's journey takes a new path as it's officially cancelled.",
          });
        })
        .catch((error: Error) => {
          console.log(error);
          toast({
            title: 'Oops, Scheduling Spells Tangled: Appointment Not Cancelled',
            description:
              'Looks like a scheduling hiccup! The appointment remains untouched.',
          });
        });
    });
  };

  const onSubmit = ({
    scheduled_date,
    scheduled_time,
  }: {
    scheduled_date: Date;
    scheduled_time: string;
  }) => {
    startTransition(() => {
      scheduleAppointment(id!, format(scheduled_date, 'P'), scheduled_time)
        .then((data) => {
          setUpdatedAppointment(data![0]);
          setIsAppointmentScheduled(true);
          toast({
            title: 'Appointment Anchored: Successfully Scheduled!',
            description:
              'Congratulations! The appointment is now securely anchored in the schedule.',
          });
          // Send appointment schedule confirmation email
          if (practiceInfo) {
            const confirmationEmailData: ConfirmationEmailData = {
              first_name: data![0].first_name,
              last_name: data![0].last_name,
              email: data![0].email,
              appointment_type: data![0].appointment_type!,
              scheduled_date: data![0].scheduled_date,
              scheduled_time: data![0].scheduled_time,
              practice_id: data![0].practice_id,
            };
            emailConfirmationHandler(confirmationEmailData, practiceInfo)
              .then(() => {
                toast({
                  title: 'Successfully sent confirmation email!',
                  description:
                    'The patient has been sent an email with the details of this confirmed appointment.',
                });
              })
              .catch((error: Error) => {
                console.log('Failed to send confirmation email: ', error);
              });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          toast({
            title: 'Oops, Appointment Planetary Alignment Off: Error Detected',
            description:
              'Planetary alignment for the appointment is slightly off due to an error.',
          });
        });
    });
  };

  const renderStatusBadges = () => {
    const statusList: string[] = [];
    if (is_emergency) {
      statusList.push('Emergency');
    }
    if (isAppointmentScheduled && !isAppointmentCancelled) {
      statusList.push('Scheduled');
    }
    if (isAppointmentCancelled) {
      statusList.push('Cancelled');
    }
    if (!isAppointmentScheduled && !isAppointmentCancelled) {
      statusList.push('Waiting');
      statusList.push(updateRequestCreatedTime(created_at!));
    }

    return statusList.map((status, index) => (
      <Badge
        key={index}
        variant="secondary"
        className={cn(
          status === 'Emergency' && 'bg-badge-emergency',
          status === 'Cancelled' && 'bg-badge-cancelled',
          status === 'Waiting' && 'bg-badge-waiting',
          status === 'Scheduled' && 'bg-badge-scheduled',
        )}
      >
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
        {description ? (
          <div className="flex flex-col gap-1">
            <h3 className="font-bold">Description: </h3>
            <p className="ml-2">{description}</p>
          </div>
        ) : null}
        <div className="flex gap-4">
          <h3 className="font-bold">Requested Date: </h3>
          <p>{format(parseISO(requested_date!.toString()), 'PPP')}</p>
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
            {isAppointmentScheduled
              ? format(parseISO(updatedAppointment.scheduled_date!), 'PPP')
              : 'Not scheduled yet'}
          </p>
        </div>
        <div className="flex gap-4">
          <h3 className="font-bold">Scheduled Time: </h3>
          <p>
            {isAppointmentScheduled &&
            updatedAppointment?.scheduled_time &&
            typeof updatedAppointment.scheduled_time === 'string'
              ? format(
                  new Date(`1970-01-01T${updatedAppointment.scheduled_time}`),
                  'h:mm a',
                )
              : 'Not scheduled yet'}
          </p>
        </div>
        {scheduled_by ? (
          <div className="flex gap-4">
            <h3 className="font-bold">Who scheduled the appointment?: </h3>
            <p>{scheduled_by}</p>
          </div>
        ) : null}
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
      <Form {...form}>
        <form
          onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
          className="mt-8 space-y-8 bg-background"
        >
          <FormField
            control={form.control}
            name="scheduled_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Scheduled Date
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500"></span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        disabled={is_cancelled!}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={[isSunday]}
                      toMonth={addMonths(new Date(), 3)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scheduled_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Scheduled Time
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500"></span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={is_cancelled!}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time to schedule" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <ScrollArea className="h-52">
                      {generateHoursInterval(
                        SEVEN_30_AM_IN_MINUTES,
                        FIVE_PM_IN_MINUTES,
                        INTERVAL_IN_MINUTES,
                      ).map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4 w-full text-lg"
            disabled={is_cancelled!}
          >
            {isAppointmentScheduled
              ? 'Reschedule Appointment'
              : 'Schedule Appointment'}
          </Button>
        </form>
      </Form>
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
