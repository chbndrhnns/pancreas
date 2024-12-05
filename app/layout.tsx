import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {SupplementProvider} from "@/components/SupplementContext";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'EnzymeWiz',
    description: 'Calculate enzyme dosage for your meals',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <SupplementProvider>
            {children}
        </SupplementProvider>
        </body>
        </html>
    )
}

