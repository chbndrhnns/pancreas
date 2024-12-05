"use client"

import {useState} from "react"
import {SearchIcon} from 'lucide-react'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import foodData from '@/data/food-items.json'
import {useRouter} from 'next/navigation'
import {useFavorites} from './FavoritesContext'

export function Search({onSearch}: { onSearch: (term: string) => void }) {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()
    const {isFavorite} = useFavorites()

    const filteredSuggestions = foodData.foodItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSelect = (selectedItem: string) => {
        setSearchTerm(selectedItem)
        setOpen(false)
        onSearch(selectedItem)
        router.push(`/food/${encodeURIComponent(selectedItem)}`)
    }

    const handleSearch = () => {
        if (searchTerm) {
            onSearch(searchTerm)
            console.log(`Searching for: ${searchTerm}`)
            setSearchTerm("")
        }
    }

    return (
        <div className="relative">
            <div className="flex w-full items-center space-x-2">
                <Input
                    type="search"
                    placeholder="Enter food item or scan barcode"
                    className="w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={() => setOpen(true)}
                />
                <Button type="submit" size="icon" onClick={handleSearch}>
                    <SearchIcon className="h-4 w-4"/>
                    <span className="sr-only">Search</span>
                </Button>
            </div>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Type a food item..."
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {filteredSuggestions.map((item) => (
                            <CommandItem key={item.name} onSelect={() => handleSelect(item.name)}>
                                <span>{item.name}</span>
                                <span className="ml-2 text-sm text-muted-foreground">
                  {item.fatContent}g fat per {item.typicalPortionUnit}
                </span>
                                {isFavorite(item.name) && (
                                    <span className="ml-auto text-yellow-500">★</span>
                                )}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    )
}

