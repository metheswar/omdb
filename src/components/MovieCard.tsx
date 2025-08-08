'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { MovieSearchResult } from '../types/movie';
import { Card, CardContent, CardFooter } from './ui/card';

interface MovieCardProps {
    movie: MovieSearchResult;
}

export function MovieCard({ movie }: MovieCardProps) {
    const searchParams = useSearchParams();

    const createMovieLink = () => {
        const params = new URLSearchParams(searchParams.toString());
        return `/movie/${movie.imdbID}?${params.toString()}`;
    };

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gray-900 rounded-md overflow-hidden">
            <Link
                href={createMovieLink()}
                aria-label={`View details for ${movie.Title}`}
            >
                <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-700">
                    {movie.Poster && movie.Poster !== 'N/A' ? (
                        <Image
                            src={movie.Poster}
                            alt={`${movie.Title} poster`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={false}
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-400">
                            No Image
                        </div>
                    )}
                </div>
                <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-white">{movie.Title}</h3>
                    <p className="text-sm text-gray-600 text-white">
                        {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)} &bull; {movie.Year}
                    </p>
                </CardContent>
            </Link>
        </Card>
    );
}