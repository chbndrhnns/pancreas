"use client"

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {ArrowLeft} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {useSupplement} from "@/components/SupplementContext";

const drugs = [
    {name: "Kreon for kids", lipaseUnits: 2000},
    {name: "Kreon 25000", lipaseUnits: 25000},
    {name: "Kreon 35000", lipaseUnits: 35000},
]

export default function UserProfile() {
    const router = useRouter()
    const {selectedSupplement, setSelectedSupplement} = useSupplement()
    const [localSupplement, setLocalSupplement] = useState(selectedSupplement)

    useEffect(() => {
        setLocalSupplement(selectedSupplement)
    }, [selectedSupplement])

    const handleDrugChange = (value: string) => {
        const drug = drugs.find(d => d.name === value)
        if (drug) {
            setLocalSupplement(drug)
            setSelectedSupplement(drug)
        }
    }

    const fatPerDose = localSupplement.lipaseUnits / 2000

    return (
        <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" onClick={() => router.push('/')} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4"/> Back to Home
            </Button>
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                    <CardDescription>Select your enzyme supplement</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="drug-select"
                                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Enzyme Supplement
                            </label>
                            <Select onValueChange={handleDrugChange} value={localSupplement.name}>
                                <SelectTrigger id="drug-select">
                                    <SelectValue placeholder="Select a drug"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {drugs.map((drug) => (
                                        <SelectItem key={drug.name} value={drug.name}>
                                            {drug.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium leading-none">Lipase Units per Dose</h3>
                            <p className="text-sm text-muted-foreground">{localSupplement.lipaseUnits} units</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium leading-none">Fat per Dose</h3>
                            <p className="text-sm text-muted-foreground">{fatPerDose.toFixed(1)} grams</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

