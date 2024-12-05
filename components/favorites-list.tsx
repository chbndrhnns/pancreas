import {Star} from 'lucide-react'
import Link from 'next/link'

// Mock data for favorites
const favorites = [
    {name: "Apple", fatContent: "0.2g"},
    {name: "Cheese", fatContent: "33g"},
    {name: "Egg", fatContent: "5g"},
    {name: "Ham", fatContent: "7g"}
]

export function FavoritesList() {

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.map((item) => (
                <Link href={`/food/${encodeURIComponent(item.name.toLowerCase())}`} key={item.name}>
                    <li className="flex items-center justify-between p-4 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors">
                        <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.fatContent} fat</p>
                        </div>
                        <Star className="h-5 w-5 text-yellow-500 fill-current"/>
                    </li>
                </Link>
            ))}
        </ul>
    )
}

