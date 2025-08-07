import { fetchMovieById } from '../../../lib/omdb';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface MoviePageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
    const movie = await fetchMovieById(params.id);

    if (movie.Response === 'False') {
        return {
            title: 'Movie Not Found',
            description: 'The requested movie could not be found.',
        };
    }

    return {
        title: movie.Title,
        description: movie.Plot,
        openGraph: {
            title: movie.Title,
            description: movie.Plot,
            images: movie.Poster !== 'N/A' ? [movie.Poster] : [],
        },
    };
}

export default async function MoviePage({ params }: MoviePageProps) {
    const movie = await fetchMovieById(params.id);

    if (movie.Response === 'False') {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 p-4">
                <h1 className="text-2xl font-bold">Movie not found</h1>
                <Link href="/" className="ml-4 text-blue-400 hover:underline">
                    Go back home
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-900 text-gray-100 p-6 max-w-5xl mx-auto">
            <div className="flex justify-end mb-4">
                <Link
                    href="/"
                    aria-label="Close movie details and go back to home"
                    className="text-gray-400 hover:text-gray-200 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Link>
            </div>
            <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-1/3 h-96 bg-gray-800 rounded-md overflow-hidden">
                    {movie.Poster !== 'N/A' ? (
                        <Image
                            src={movie.Poster}
                            alt={`${movie.Title} poster`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-500">
                            No Image Available
                        </div>
                    )}
                </div>
                <div className="flex-1 space-y-4">
                    <p><strong>Plot:</strong> {movie.Plot}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>Rating:</strong> {movie.imdbRating}</p>
                    <p><strong>Release Date:</strong> {movie.Released}</p>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Writer:</strong> {movie.Writer}</p>
                </div>
            </div>
        </main>
    );
}