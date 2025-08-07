'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function SearchFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [localSearch, setLocalSearch] = useState(searchParams.get('search') || 'Avengers');
    const [type, setType] = useState(searchParams.get('type') || 'all');
    const [year, setYear] = useState(searchParams.get('year') || '');

    useEffect(() => {
        const handler = setTimeout(() => {
            updateUrlParams(localSearch, type, year);
        }, 500);
        return () => clearTimeout(handler);
    }, [localSearch, type, year]);

    function updateUrlParams(search: string, type: string, year: string) {
        const params = new URLSearchParams();

        if (search) params.set('search', search);
        if (type && type !== 'all') params.set('type', type);
        if (year) params.set('year', year);

        params.set('page', '1');

        const queryString = params.toString();
        router.push(`/?${queryString}`);
    }

    return (
        <form
            className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-4xl mx-auto p-4"
            onSubmit={(e) => e.preventDefault()}
            role="search"
            aria-label="Search movies and series"
        >
            <Input
                type="search"
                placeholder="Search movies or series..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                aria-label="Search movies or series"
                className="flex-grow"
            />
            <Select
                value={type}
                onValueChange={(value: string) => setType(value)}
                aria-label="Filter by type"
            >
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="movie">Movies</SelectItem>
                    <SelectItem value="series">Series</SelectItem>
                </SelectContent>
            </Select>
            <Input
                type="number"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                aria-label="Filter by year"
                min={1900}
                max={2100}
                className="w-24"
            />
        </form>
    );
}