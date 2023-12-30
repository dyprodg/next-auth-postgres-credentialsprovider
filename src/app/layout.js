import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProviders } from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Phoshare',
  description: 'Share you photos online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviders>
          {children}
        </AuthProviders>
      </body>
    </html>
  )
}
