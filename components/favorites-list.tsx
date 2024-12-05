import {X} from 'lucide-react'
import Link from 'next/link'
import foodData from '@/data/food-items.json'
import {useFavorites} from './FavoritesContext'
import {Button} from './ui/button'


export function FavoritesList() {
    const {favorites, toggleFavorite} = useFavorites()
    const favoriteItems = foodData.foodItems.filter(item => favorites.has(item.name))

    const handleRemoveFavorite = (
        e: React.MouseEvent<HTMLButtonElement>,
        name: string
    ) => {
        e.preventDefault()
        toggleFavorite(name)
    }

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favoriteItems.map((item) => (
                <Link href={`/food/${encodeURIComponent(item.name)}`} key={item.name}>
                    <li className="flex items-center justify-between p-4 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors">
                        <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.fatContent} fat</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => handleRemoveFavorite(e, item.name)}
                            className="ml-2 hover:bg-secondary-foreground/10"
                        >
                            <X className="h-4 w-4"/>
                        </Button>
                    </li>
                </Link>
            ))}
            {favoriteItems.length === 0 && (
                <li className="col-span-full text-center text-muted-foreground py-8">
                    No favorites yet
                </li>
            )}
        </ul>
    )
}

