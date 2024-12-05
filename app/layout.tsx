import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {SupplementProvider} from "@/components/SupplementContext";
import {FavoritesProvider} from "@/components/FavoritesContext";

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
        <FavoritesProvider>
        <SupplementProvider>
            {children}
        </SupplementProvider>
        </FavoritesProvider>
        </body>
        </html>
    )
}

