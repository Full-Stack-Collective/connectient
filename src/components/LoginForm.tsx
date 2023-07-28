'use client';

import { useState, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from './ui/use-toast';

import { loginFormAction } from './actions';

// Define Login Form schema
const formSchema = z.object({
  email: z.string().nonempty('Email is required').email('Not a valid email'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(8, 'Password should be atleast 8 chars long'),
});

// React component for logging in admins
const LoginForm = () => {
  const router = useRouter();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    form.reset(defaultValues);
  }, [isFormSubmitted]);

  const defaultValues = {
    email: '',
    password: '',
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = ({ email, password }: z.infer<typeof formSchema>) => {
    setIsFormSubmitted(true);

    startTransition(() => {
      // Authenticate the user
      loginFormAction({ email, password })
        .then((data) => {
          // If the user is not in our system
          if (!data.user || !data.session) {
            toast({
              title: 'Oops! Admin Discovery Failed',
              description:
                "We couldn't find your admin profile in the digital realm.",
            });
          } else {
            // If the user is  authenticated
            toast({
              title: 'Admin Login Achieved',
              description:
                "You've joined forces to ensure the smoothest scheduling journey for patients.",
            });
            router.refresh();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <main className="flex-1 flex flex-col justify-center items-center">
      <h1 className="mt-8 mb-6 w-full max-w-lg text-4xl font-extrabold tracking-wide leading-2 text-center md:leading-snug">
        Unlock the Gateway to{' '}
        <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
          Seamless Scheduling
        </span>
      </h1>
      <Form {...form}>
        <form
          onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
          className="p-4 w-full max-w-md border bg-background rounded-lg flex flex-col gap-4"
        >
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-lg">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                    Email
                  </span>
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-lg">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                    Password
                  </span>
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 w-full text-lg">
            Login
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default LoginForm;
