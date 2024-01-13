import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/providers/toast'
import Header from '@/components/header';
import Footer from '@/components/footer';

const font = Roboto({ weight: '300', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LP-FTY',
  description: 'fty-a',
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
