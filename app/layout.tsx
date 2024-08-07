import type { Metadata } from 'next'

import { Comfortaa } from 'next/font/google'
import './globals.css'
import { StoreProvider } from '@/lib/store/StoreProvider'
import NavbarDummy from '@/app/components/Home/NavbarDummy'
const comfortaa = Comfortaa({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'RAGE YOGA',
    description: 'Rajyavardhan Bithale',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <StoreProvider>
            <html lang="en" data-theme="light">
                <body className={comfortaa.className}>
                    <NavbarDummy />
                    {children}
                </body>
            </html>
        </StoreProvider>
    )
}
