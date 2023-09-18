'use client';

import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { signupSupabaseAuthUser } from './actions';
// Import UI components
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
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from './ui/use-toast';

const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export function AdminSignUpForm() {
  const [, startTransition] = useTransition();
  const { toast } = useToast();
  const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  // 2. Define a submit handler.
  const onSubmit = ({ email, password }: z.infer<typeof formSchema>) => {
    startTransition(() => {
      // Check if the user email already exists in the DB -- need to look into it

      // Signup the user if the user doesn't already exists
      signupSupabaseAuthUser({ email, password })
        .then((data) => {
          console.log(data);
          if (data.user) {
            toast({
              title:
                "Congrats! You're one step closer to be part of Connectient",
              description:
                "We've received your registration, & a confirmation email is en route to your inbox.",
            });
          }
        })
        .catch(() => {
          toast({
            title: 'Shoooooo! A whirlwind error!',
            description:
              "Your registration got caught in a whirlwind of tech magic. Hang tight, we're resolving it.",
          });
        });
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
            className="space-y-8 my-5 bg-background"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500"></span>
                  <FormControl>
                    <Input placeholder="hello@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500"></span>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500"></span>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={
                !form.formState.isDirty ||
                (form.formState.isDirty && !form.formState.isValid)
              }
            >
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
