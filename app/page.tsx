"use client"

import {useState} from "react"
import Link from "next/link"
import {Search} from "@/components/search"
import {FavoritesList} from "@/components/favorites-list"
import {RecentSearches} from "@/components/recent-searches"
import {Button} from "@/components/ui/button"
import {UserIcon} from 'lucide-react'

const initialRecentSearches = ["Pizza", "Burger", "Salad", "Ice Cream"]

export default function Home() {
    const [recentSearches, setRecentSearches] = useState<string[]>(initialRecentSearches)

    const updateRecentSearches = (newSearch: string) => {
        setRecentSearches(prev => {
            return [newSearch, ...prev.filter(i => i !== newSearch)].slice(0, 5)
        })
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">EnzymeWiz</h1>
                <Link href="/profile">
                    <Button variant="outline" size="icon">
                        <UserIcon className="h-4 w-4"/>
                        <span className="sr-only">User Profile</span>
                    </Button>
                </Link>
            </div>
            <Search onSearch={updateRecentSearches}/>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
                <FavoritesList/>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Recent Searches</h2>
                <RecentSearches searches={recentSearches}/>
            </div>
        </main>
    )
}

