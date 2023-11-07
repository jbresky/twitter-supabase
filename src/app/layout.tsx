import LeftSidebar from '@/components/left-sidebar'
import RightSection from '@/components/right-section'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Twitter clone',
  description: 'Twitter for web. With supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full h-full flex justify-center bg-black text-white">
          <LeftSidebar />
          {children}
          <RightSection />
        </div>
      </body>
    </html>
  )
}
