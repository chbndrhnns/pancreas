"use client"

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {ArrowLeft, Heart, Minus, Plus, UserIcon} from 'lucide-react'
import {Slider} from "@/components/ui/slider"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useSupplement} from "@/components/SupplementContext";
// Mock data for food items
interface FoodItem {
    name: string;
    fatContent: string;
    isFavorite: boolean;
    typicalPortionSize: number;
    typicalPortionUnit: string;
}

const foodItems: FoodItem[] = [
    {name: "Apple", fatContent: "0.2g", isFavorite: true, typicalPortionSize: 100, typicalPortionUnit: "g"},
    {name: "Banana", fatContent: "0.3g", isFavorite: false, typicalPortionSize: 120, typicalPortionUnit: "g"},
    {name: "Cheese", fatContent: "33g", isFavorite: true, typicalPortionSize: 30, typicalPortionUnit: "g"},
    {name: "Donut", fatContent: "22g", isFavorite: false, typicalPortionSize: 60, typicalPortionUnit: "g"},
    {name: "Egg", fatContent: "5g", isFavorite: true, typicalPortionSize: 50, typicalPortionUnit: "g"},
    {name: "French Fries", fatContent: "15g", isFavorite: false, typicalPortionSize: 100, typicalPortionUnit: "g"},
    {name: "Grapes", fatContent: "0.2g", isFavorite: false, typicalPortionSize: 80, typicalPortionUnit: "g"},
    {name: "Ham", fatContent: "7g", isFavorite: true, typicalPortionSize: 50, typicalPortionUnit: "g"}
]


export default function FoodDetail({params}: { params: { name: string } }) {
    const router = useRouter()
    const {selectedSupplement} = useSupplement()
    const [foodItem, setFoodItem] = useState<FoodItem | null>(null)
    const [portion, setPortion] = useState(100)
    const [numberOfPortions, setNumberOfPortions] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const item = foodItems.find(item => item.name.toLowerCase() === params.name.toLowerCase())
        if (item) {
            setFoodItem(item)
            setIsFavorite(item.isFavorite)
            setPortion(item.typicalPortionSize)
        }
    }, [params.name])

    if (!foodItem) return <div>Loading...</div>

    const fatContent = parseFloat(foodItem.fatContent)
    const adjustedFatContent = (fatContent * portion * numberOfPortions / 100).toFixed(1)
    const enzymeDosage = Math.ceil((parseFloat(adjustedFatContent) * 2000) / selectedSupplement.lipaseUnits)

    const handlePortionChange = (newPortion: number[]) => {
        setPortion(newPortion[0])
    }

    const handleNumberOfPortionsChange = (change: number) => {
        setNumberOfPortions(prev => Math.max(1, prev + change))
    }

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
        // Here you would typically update this in your backend or local storage
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
                <p className="text-xl mb-6">Fat Content: {adjustedFatContent}g</p>
                <div className="mb-6">
                    <label htmlFor="portion-slider" className="block text-sm font-medium mb-2">
                        Portion Size: {portion}g
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
                <Button onClick={toggleFavorite} variant={isFavorite ? "secondary" : "outline"} className="w-full">
                    <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`}/>
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
            </div>
        </div>
    )
}

