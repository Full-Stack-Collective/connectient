'use client';

import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '@styles/appointmentForm.module.css';
import { createAppointmentFormAction } from './actions';
import AppointmentDetailsPopup from './AppointmentDetailsPopup';
import ErrorPopup from './ErrorPopup';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// <-- UI -->
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: 'First name should be at least 2 characters' }),
  last_name: z
    .string()
    .min(2, { message: 'Last name should be at least 2 characters' }),
  mobile_phone: z.string({ required_error: 'Phone number is required' }),
  email: z.string().email(),
  requested_date: z.string().datetime(),
  requested_time: z.string(),
  appointment_type: z.string(),
  description: z.string().optional(),
  is_emergency: z.boolean().default(false),
});

const AppointmentForm = () => {
  const [, startTransition] = useTransition();
  const [createdAppointment, setCreatedAppointment] = useState<z.infer<
    typeof formSchema
  > | null>(null);
  const [isAppointmentDetailsPopupOpen, setIsAppointmentDetailsPopupOpen] =
    useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const defaultValues = {
    first_name: '',
    last_name: '',
    mobile_phone: '',
    email: '',
    requested_date: '',
    requested_time: '',
    appointment_type: '',
    description: '',
    is_emergency: false,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (createdAppointment: z.infer<typeof formSchema>) => {
    setCreatedAppointment(createdAppointment);
    setIsPreviewMode(true);
  };

  const handleConfirmAppointment = (createdAppointment: Appointment) => {
    startTransition(() => {
      createAppointmentFormAction(createdAppointment)
        .then((createdAppointment) => {
          console.log('Appointment created:', createdAppointment);
          setIsAppointmentDetailsPopupOpen(true);
          form.reset(defaultValues);
          setErrorMessage('');
          setIsPreviewMode(false);
        })
        .catch((error) => {
          console.error('Failed to create appointment:', error);
          setErrorMessage(
            'Appointment request not sent, please try again or call the phone number 123-123-1234',
          );
        });
    });
  };
  const handleGoBack = () => {
    setIsPreviewMode(false);
  };

  return (
    <>
      {isPreviewMode ? (
        <>
          <h2>Appointment Preview</h2>
          <p>
            Name: {createdAppointment?.first_name}{' '}
            {createdAppointment?.last_name}
          </p>
          <p>Email: {createdAppointment?.email}</p>
          <p>Phone: {createdAppointment?.mobile_phone}</p>
          <p>
            Requested Appointment Date: {createdAppointment?.requested_date}
          </p>
          <p>
            Requested Appointment Time: {createdAppointment?.requested_time}
          </p>
          <p>
            Requested Appointment Type: {createdAppointment?.appointment_type}
          </p>
          {createdAppointment?.description && (
            <p>Description: {createdAppointment?.description}</p>
          )}
          <p>Emergency: {createdAppointment?.is_emergency}</p>
          <button onClick={handleGoBack}>Go Back </button>

          <button onClick={() => handleConfirmAppointment(createdAppointment)}>
            Submit
          </button>
        </>
      ) : (
        <>
          <p>Submit the form below to request an appointment.</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className={styles.apptFormSection}>
                <label
                  htmlFor="mobile_phone"
                  className={`${styles.inputLabel} ${styles.required}`}
                >
                  Phone contact:{' '}
                </label>
                <PhoneInputWithCountry
                  id="mobile_phone"
                  international={true}
                  addInternationalOption={false}
                  countryCallingCodeEditable={false}
                  countryOptionsOrder={['TT']}
                  limitMaxLength={true}
                  defaultCountry="TT"
                  control={form.control}
                  name="mobile_phone"
                  defaultValue=""
                  rules={{
                    required: 'Phone number is required.',
                    validate: (value: string) =>
                      isPossiblePhoneNumber(`${value}`) ||
                      'Please enter a valid phone number.',
                  }}
                />
                {/* <p className={styles.error}>
                {errors.mobile_phone && errors.mobile_phone.message}
              </p> */}
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="patient@essentialdentaltt.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* date picker */}

              <FormField
                control={form.control}
                name="requested_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Time Preference</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time of day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose flexible if no preference.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appointment_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Time Preference</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time of day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="examination">Examination</SelectItem>
                        <SelectItem value="cleaning">
                          Cleaning/Polishing
                        </SelectItem>
                        <SelectItem value="extraction">Extraction</SelectItem>
                        <SelectItem value="filling">Filling</SelectItem>
                        <SelectItem value="other">Something Else</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can <span>@mention</span> other users and
                      organizations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_emergency"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Is this an emergency?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={true} />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={false} />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </>
      )}

      {createdAppointment && isAppointmentDetailsPopupOpen && (
        <AppointmentDetailsPopup
          appointment={createdAppointment}
          isOpen={isAppointmentDetailsPopupOpen}
          onClose={() => setIsAppointmentDetailsPopupOpen(false)}
        />
      )}

      {errorMessage && (
        <ErrorPopup
          isOpen={errorMessage !== ''}
          onClose={() => setErrorMessage('')}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};

export default AppointmentForm;
