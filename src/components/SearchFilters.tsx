'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function SearchFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = (formData: FormData) => {
        const params = new URLSearchParams();

        const search = formData.get('search') as string;
        const type = formData.get('type') as string;
        const year = formData.get('year') as string;

        if (search) params.set('search', search);
        if (type && type !== 'all') params.set('type', type);
        if (year) params.set('year', year);
        params.set('page', '1');

        router.push(`/?${params.toString()}`, { scroll: false });
    };

    return (
        <form
            action={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-4xl mx-auto p-4"
        >
            <Input
                name="search"
                type="search"
                placeholder="Search movies or series..."
                defaultValue={searchParams.get('search') || 'Avengers'}
                className="flex-grow"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e.currentTarget.form?.formData)}
            />

            <Select name="type" defaultValue={searchParams.get('type') || 'all'}>
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
                name="year"
                type="number"
                placeholder="Year"
                defaultValue={searchParams.get('year') || ''}
                min={1900}
                max={2100}
                className="w-24"
            />

            <Button type="submit">Search</Button>
        </form>
    );
}
