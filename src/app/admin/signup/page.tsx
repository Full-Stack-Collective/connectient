import { AdminSignUpForm } from '@/components/AdminSignUp';

export default function SignUp() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center">
      <h1 className="mt-8 mb-6 w-full max-w-lg text-4xl font-extrabold tracking-wide leading-2 text-center md:leading-snug">
        Thanks for choosing{' '}
        <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
          Connectient
        </span>
        <p className="mt-4 text-sm text-center">Please register your account</p>
      </h1>
      <AdminSignUpForm />
    </main>
  );
}
