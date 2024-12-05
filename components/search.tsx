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
import {useRouter} from 'next/navigation'

// Mock data for suggestions
const suggestions = [
    {name: "Apple", fatContent: "0.2g", isFavorite: true, typicalPortionSize: 100, typicalPortionUnit: "g"},
    {name: "Banana", fatContent: "0.3g", isFavorite: false, typicalPortionSize: 120, typicalPortionUnit: "g"},
    {name: "Cheese", fatContent: "33g", isFavorite: true, typicalPortionSize: 30, typicalPortionUnit: "g"},
    {name: "Donut", fatContent: "22g", isFavorite: false, typicalPortionSize: 60, typicalPortionUnit: "g"},
    {name: "Egg", fatContent: "5g", isFavorite: true, typicalPortionSize: 50, typicalPortionUnit: "g"},
    {name: "French Fries", fatContent: "15g", isFavorite: false, typicalPortionSize: 100, typicalPortionUnit: "g"},
    {name: "Grapes", fatContent: "0.2g", isFavorite: false, typicalPortionSize: 80, typicalPortionUnit: "g"},
    {name: "Ham", fatContent: "7g", isFavorite: true, typicalPortionSize: 50, typicalPortionUnit: "g"}
]

export function Search({onSearch}: { onSearch: (term: string) => void }) {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()

    const filteredSuggestions = suggestions.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSelect = (selectedItem: string) => {
        setSearchTerm(selectedItem)
        setOpen(false)
        onSearch(selectedItem)
        router.push(`/food/${encodeURIComponent(selectedItem.toLowerCase())}`)
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
                  {item.fatContent} fat
                </span>
                                {item.isFavorite && (
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

