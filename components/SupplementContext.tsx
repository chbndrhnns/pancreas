"use client"

import React, {createContext, ReactNode, useContext, useState} from 'react'

type Supplement = {
    name: string
    lipaseUnits: number
}

type SupplementContextType = {
    selectedSupplement: Supplement
    setSelectedSupplement: (supplement: Supplement) => void
}

const defaultSupplement: Supplement = {
    name: "Kreon for kids",
    lipaseUnits: 5000
}

const SupplementContext = createContext<SupplementContextType | undefined>(undefined)

export function SupplementProvider({children}: { children: ReactNode }) {
    const [selectedSupplement, setSelectedSupplement] = useState<Supplement>(defaultSupplement)

    return (
        <SupplementContext.Provider value={{selectedSupplement, setSelectedSupplement}}>
            {children}
        </SupplementContext.Provider>
    )
}

export function useSupplement() {
    const context = useContext(SupplementContext)
    if (context === undefined) {
        throw new Error('useSupplement must be used within a SupplementProvider')
    }
    return context
}

