import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { ContextProvider } from '../contexts/ContextProvider'
import { Providers } from './GlobalRedux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DirApp',
  description: 'DirApp',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Providers>
          <ContextProvider>
            {children}
          </ContextProvider>
        </Providers>
      </body>
    </html>
  )
}
