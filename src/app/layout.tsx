import { Lato } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata = {
  openGraph: {
    title: 'Connectient',
    description: 'Appointments Made Easy',
    url: 'https://connectient.co/',
    images: [
      {
        url: '/connectient-logo.png',
        width: '400',
        height: '400',
        alt: 'Connectient Logo',
      },
    ],
  },
};

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <body className="text-lg">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
