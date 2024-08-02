import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import Header from './Header'
import Footer from './Footer'
import { CurrencyProvider } from './CurrencyContext'
import { ThemeProvider } from 'next-themes'

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata = {
  title: 'Dubai Invest App',
  description: 'Dubai Real Estate Investment Calculator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'flex flex-col min-h-screen antialiased',
        fontHeading.variable,
        fontBody.variable
      )}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CurrencyProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}