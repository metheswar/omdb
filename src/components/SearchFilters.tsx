'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useCallback, useEffect, useRef, useState } from 'react';

export function SearchFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [formValues, setFormValues] = useState({
        search: searchParams.get('search') || '',
        type: searchParams.get('type') || 'all',
        year: searchParams.get('year') || ''
    });

    const prevValuesRef = useRef(formValues);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    const updateRoute = useCallback((values: typeof formValues) => {
        const params = new URLSearchParams();

        if (values.search) params.set('search', values.search);
        if (values.type && values.type !== 'all') params.set('type', values.type);
        if (values.year) params.set('year', values.year);
        params.set('page', '1');

        router.push(`/?${params.toString()}`, { scroll: false });
    }, [router]);

    const debouncedUpdate = useCallback((newValues: typeof formValues) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        const hasChanged =
            newValues.search !== prevValuesRef.current.search ||
            newValues.type !== prevValuesRef.current.type ||
            newValues.year !== prevValuesRef.current.year;

        if (hasChanged) {
            debounceTimerRef.current = setTimeout(() => {
                updateRoute(newValues);
                prevValuesRef.current = { ...newValues };
            }, 500);
        }
    }, [updateRoute]);

    const handleSearchChange = (value: string) => {
        const newValues = { ...formValues, search: value };
        setFormValues(newValues);
        debouncedUpdate(newValues);
    };

    const handleTypeChange = (value: string) => {
        const newValues = { ...formValues, type: value };
        setFormValues(newValues);
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        if (value !== prevValuesRef.current.type) {
            updateRoute(newValues);
            prevValuesRef.current = { ...newValues };
        }
    };

    const handleYearChange = (value: string) => {
        const newValues = { ...formValues, year: value };
        setFormValues(newValues);
        debouncedUpdate(newValues);
    };

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const newValues = {
            search: searchParams.get('search') || '',
            type: searchParams.get('type') || 'all',
            year: searchParams.get('year') || ''
        };

        setFormValues(newValues);
        prevValuesRef.current = newValues;
    }, [searchParams]);

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-4xl mx-auto p-4">
            <Input
                type="search"
                placeholder="Search movies or series..."
                value={formValues.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="flex-grow"
            />

            <Select
                value={formValues.type}
                onValueChange={handleTypeChange}
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
                value={formValues.year}
                onChange={(e) => handleYearChange(e.target.value)}
                min={1900}
                max={2100}
                className="w-24"
            />
        </div>
    );
}
