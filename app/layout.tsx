import type { Metadata } from 'next'

import { Comfortaa } from 'next/font/google'
import './globals.css'
import { StoreProvider } from '@/lib/store/StoreProvider'
import SmoothScrolling from './components/SmoothScroll'
const comfortaa = Comfortaa({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'RAGE AI',
    description:
        'RAGE AI: Personalized yoga guidance, real-time feedback, and progress tracking to enhance your practice. Explore now!',
    generator: 'Next.js',
    applicationName: 'RAGE AI',
    icons: 'logo.svg',
    referrer: 'origin-when-cross-origin',
    keywords: [
        'Next.js',
        'React',
        'JavaScript',
        'yoga',
        'github',
        'RAGE AI',
        'Yoga practice',
        'AI yoga guidance',
        'personalized yoga tips',
        'real-time yoga feedback',
        'yoga poses',
        'yoga practice platform',
        'user-friendly yoga app',
        'yoga practice improvement',
        'AI yoga trainer',
        'track yoga progress',
        'celebrate yoga achievements',
        'healthy diet',
        'personalized diet experience',
        'RAGE AI dashboard',
        'project',
    ],
    authors: [
        {
            name: 'Rajyavardhan Bithale',
            url: 'https://github.com/rajyavardhanbithale',
        },
    ],
    creator: 'Rajyavardhan Bithale',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: 'RAGE AI',
        description:
            'RAGE AI: Personalized yoga guidance, real-time feedback, and progress tracking to enhance your practice. Explore now!',
        url: 'https://yoga-trainer.vercel.app/',
        siteName: 'RAGE AI',
        images: [
            {
                url: 'https://raw.githubusercontent.com/rajyavardhanbithale/yoga-trainer/main/public/https://raw.githubusercontent.com/rajyavardhanbithale/yoga-trainer/main/public/seo/screens.webp',
                width: 800,
                height: 600,
            },
            {
                url: 'https://raw.githubusercontent.com/rajyavardhanbithale/yoga-trainer/main/public/seo/screens.webp',
                width: 1800,
                height: 1600,
                alt: 'RAGE AI',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'RAGE AI',
        description:
            'RAGE AI: Personalized yoga guidance, real-time feedback, and progress tracking to enhance your practice. Explore now!',
        creator: '@Saul08Goodman',
        images: [
            'https://raw.githubusercontent.com/rajyavardhanbithale/yoga-trainer/main/public/seo/screens.webp',
        ],
    },
    robots: 'all',
    publisher: 'Rajyavardhan Bithale',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <StoreProvider>
            <html lang="en" data-theme="light">
                <head>
                    <link rel="icon" href="favicon.ico" sizes="any" />
                </head>
                <body className={comfortaa.className}>
                    <SmoothScrolling>{children}</SmoothScrolling>
                </body>
            </html>
        </StoreProvider>
    )
}
