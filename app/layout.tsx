import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Defaa',
  description: 'Defaa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <head>
        <link rel="icon" href="./favicon.ico"/>
      </head>
      <body className='bg-[#dcc8bfb9]'>
        <div className='container mx-auto px-4'>
              <Navbar/>
                <Toaster />
                {children}
              <Footer/>
          </div>
        </body>
    </html>
  )
}