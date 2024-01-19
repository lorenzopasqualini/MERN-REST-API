import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/providers/toast'
import Header from '@/components/header';
import Footer from '@/components/footer';

const font = Roboto({ weight: '300', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pasqualini FTY Assessment',
  description: 'Fetch a public API of users, populate it to a MongoDB collection and enable a CRUD of users top of it, with instantaneous synchronization.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        <ToastProvider />
        {children}
        <Footer />
      </body>
    </html>
  )
}
