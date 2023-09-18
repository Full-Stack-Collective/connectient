import { AdminSignUpForm } from '@/components/AdminSignUp';
import React from 'react';

export default function SignUp() {
  return (
    <div className="max-w-sm mx-auto">
      <h1 className="font-semibold text-center">
        Thanks for choosing Connectient
      </h1>
      <p className="text-sm text-center">Please register your account</p>
      <AdminSignUpForm />
    </div>
  );
}
