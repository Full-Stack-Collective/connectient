import { Lato } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://connectient.co'),
  title: {
    default: 'Connectient',
    template: `%s | Connectient`,
  },
  description: 'Appointments Made Easy',
  openGraph: {
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
    <>
      <html lang="en" className={`${lato.variable}`}>
        <body className="text-lg">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen flex flex-col">{children}</div>
            <Toaster />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </>
  );
};

export default RootLayout;
