"use client"

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {ArrowLeft, Heart, Minus, Plus, UserIcon} from 'lucide-react'
import {Slider} from "@/components/ui/slider"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useSupplement} from "@/components/SupplementContext";
import {useFavorites} from "@/components/FavoritesContext";
import foodData from '@/data/food-items.json';

interface FoodItem {
    name: string;
    fatContent: string | null;
    isFavorite: boolean;
    typicalPortionSize: number;
    typicalPortionUnit: string;
}


export default function FoodDetail({params}: { params: { name: string } }) {
    const router = useRouter()
    const {selectedSupplement} = useSupplement()
    const [foodItem, setFoodItem] = useState<FoodItem | null>(null)
    const [portion, setPortion] = useState(100)
    const [numberOfPortions, setNumberOfPortions] = useState(1)
    const {isFavorite, toggleFavorite} = useFavorites()

    useEffect(() => {
        const decodedName = decodeURIComponent(params.name)
        const item = foodData.foodItems.find(item => item.name === decodedName)
        if (item) {
            setFoodItem(item)
            setPortion(item.typicalPortionSize)
        }
    }, [params.name])

    if (!foodItem) return <div>Loading...</div>

    const fatContent = parseFloat(foodItem.fatContent || '0')
    const adjustedFatContent = (fatContent * portion * numberOfPortions / 100).toFixed(1)
    const enzymeDosage = Math.ceil((parseFloat(adjustedFatContent) * 2000) / selectedSupplement.lipaseUnits)

    const handlePortionChange = (newPortion: number[]) => {
        setPortion(newPortion[0])
    }

    const handleNumberOfPortionsChange = (change: number) => {
        setNumberOfPortions(prev => Math.max(1, prev + change))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4"/> Back
                </Button>
                <Link href="/profile">
                    <Button variant="outline" size="icon">
                        <UserIcon className="h-4 w-4"/>
                        <span className="sr-only">User Profile</span>
                    </Button>
                </Link>
            </div>
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold mb-4">{foodItem.name}</h1>
                <div className="bg-secondary/50 rounded-md p-4 mb-6">
                    <p className="text-sm text-muted-foreground">Base fat content per portion</p>
                    <p className="text-lg font-medium">{foodItem.fatContent}g
                        per {foodItem.typicalPortionSize} {foodItem.typicalPortionUnit}</p>
                </div>
                <p className="text-xl mb-6">Fat Content: {adjustedFatContent}g</p>
                <div className="mb-6">
                    <label htmlFor="portion-slider" className="block text-sm font-medium mb-2">
                        Portion Size: {portion}{foodItem.typicalPortionUnit}
                    </label>
                    <Slider
                        id="portion-slider"
                        min={0}
                        max={500}
                        step={10}
                        value={[portion]}
                        onValueChange={handlePortionChange}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="number-of-portions" className="block text-sm font-medium mb-2">
                        Number of Portions
                    </label>
                    <div className="flex items-center">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleNumberOfPortionsChange(-1)}
                            disabled={numberOfPortions <= 1}
                        >
                            <Minus className="h-4 w-4"/>
                        </Button>
                        <Input
                            id="number-of-portions"
                            type="number"
                            value={numberOfPortions}
                            onChange={(e) => setNumberOfPortions(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-20 mx-2 text-center"
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleNumberOfPortionsChange(1)}
                        >
                            <Plus className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
                <div className="bg-primary/10 rounded-md p-4 mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Enzyme Dosage</h2>
                    <p className="text-xl">Take {enzymeDosage} capsule{enzymeDosage !== 1 ? 's' : ''} of {selectedSupplement.name}</p>
                </div>
                <Button
                    onClick={() => toggleFavorite(foodItem.name)}
                    variant={isFavorite(foodItem.name) ? "secondary" : "outline"}
                    className="w-full"
                >
                    <Heart className={`mr-2 h-4 w-4 ${isFavorite(foodItem.name) ? 'fill-current' : ''}`}/>
                    {isFavorite(foodItem.name) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
            </div>
        </div>
    )
}

