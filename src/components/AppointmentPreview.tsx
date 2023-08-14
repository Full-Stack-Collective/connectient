import { capitalizeWord } from '@/utils/utils';
import { Button } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';

const AppointmentPreview = ({
  createdAppointment,
  handleConfirmAppointment,
  handleGoBack,
}: {
  createdAppointment: Appointment;
  handleConfirmAppointment: (appointment: Appointment) => void;
  handleGoBack: () => void;
}) => {
  return (
    <Card className="my-12 text-base">
      <CardHeader>
        <CardTitle>Does this look right?</CardTitle>
        <CardDescription>Confirm your details to submit</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-semibold">Appointment for: </span>{' '}
          {createdAppointment?.first_name} {createdAppointment?.last_name}
        </p>
      </CardContent>
      <CardContent>
        <p>
          <span className="font-semibold">Email: </span>
          {createdAppointment?.email}
        </p>
      </CardContent>
      <CardContent>
        <p>
          <span className="font-semibold">Phone: </span>{' '}
          {createdAppointment?.mobile_phone}
        </p>
      </CardContent>
      <CardContent>
        <p>
          <span className="font-semibold">Requested Date: </span>
          {createdAppointment?.requested_date?.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </CardContent>

      <CardContent>
        <p>
          <span className="font-semibold">Preferred Time: </span>
          {createdAppointment?.requested_time}
        </p>
      </CardContent>
      <CardContent>
        <p>
          <span className="font-semibold">Procedure Type: </span>
          {createdAppointment?.appointment_type &&
            capitalizeWord(createdAppointment?.appointment_type)}
        </p>
      </CardContent>

      {createdAppointment?.description ? (
        <CardContent>
          <p>
            <span className="font-semibold">Additional Details: </span>
            {capitalizeWord(createdAppointment.description)}
          </p>
        </CardContent>
      ) : null}

      {createdAppointment?.is_emergency ? (
        <CardContent>
          <p>This is an emergency</p>
        </CardContent>
      ) : null}

      <CardFooter className="flex justify-around my-4">
        {' '}
        <Button variant="outline" onClick={handleGoBack}>
          Go Back{' '}
        </Button>
        <Button onClick={() => handleConfirmAppointment(createdAppointment)}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentPreview;
