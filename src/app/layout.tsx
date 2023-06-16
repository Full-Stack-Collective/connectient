import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Connectient',
  description: 'Appointment request system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const year = new Date().getFullYear()

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer>Footer text</footer>
      </body>
    </html>
  )
}
