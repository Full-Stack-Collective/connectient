import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata = {
  title: 'Connectient',
  description: 'Appointment request system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans-serif text-lg">
        <div className="min-h-screen flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
