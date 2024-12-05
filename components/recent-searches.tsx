import {Clock} from 'lucide-react'

interface RecentSearchesProps {
    searches: string[]
}

export function RecentSearches({searches}: RecentSearchesProps) {
    return (
        <ul className="space-y-2">
            {searches.map((item) => (
                <li key={item} className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground"/>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}

