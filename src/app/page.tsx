import { fetchMovies } from '../lib/omdb';
import { MovieSearchResult } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import { SearchFilters } from '../components/SearchFilters';
import { Pagination } from '../components/Pagination';
import { Metadata } from 'next';

interface HomePageProps {
  searchParams: Promise<{
    search?: string;
    type?: 'movie' | 'series';
    year?: string;
    page?: string;
  }>;
}

const RESULTS_PER_PAGE = 10;

export const metadata: Metadata = {
  title: 'Movie Explorer',
  description: 'Search and explore movies and series using OMDb API',
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { search = 'Avengers', type = '', year = '', page = '1' } = await searchParams;
  const pageNumber = parseInt(page, 10);

  let movies: MovieSearchResult[] = [];
  let totalResults = 0;
  let error: string | null = null;

  if (search) {
    try {
      const data = await fetchMovies(search, type as 'movie' | 'series' | undefined, year, pageNumber);
      if (data.Response === 'True') {
        movies = data.Search;
        totalResults = Number(data.totalResults);
      } else {
        error = data.Error || 'No results found';
      }
    } catch {
      error = 'Network error. Please try again.';
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Movie Explorer</h1>
      <SearchFilters />
      {error && <p className="text-center mt-8 text-red-500">{error}</p>}
      {!error && movies.length === 0 && search && (
        <p className="text-center mt-8">No results found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
      <Pagination
        currentPage={pageNumber}
        totalResults={totalResults}
        resultsPerPage={RESULTS_PER_PAGE}
      />
    </main>
  );
}
