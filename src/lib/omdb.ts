import { MovieSearchResponse, MovieDetail } from '../types/movie';

const API_URL = 'https://www.omdbapi.com/';

const apiKey = process.env.OMDB_API_KEY;

if (!apiKey) {
    throw new Error('OMDB_API_KEY environment variable is not set');
}

const key = apiKey as string;

export async function fetchMovies(
    search: string,
    type?: 'movie' | 'series',
    year?: string,
    page: number = 1
): Promise<MovieSearchResponse> {
    const params = new URLSearchParams({
        apikey: key,
        s: search,
        page: page.toString(),
    });

    if (type) {
        params.append('type', type);
    }
    if (year) {
        params.append('y', year);
    }

    const url = `${API_URL}?${params.toString()}`;

    const res = await fetch(url, { cache: 'no-store' });
    const data: MovieSearchResponse = await res.json();

    console.log('fetchMovies response:', data);

    return data;
}

export async function fetchMovieById(id: string): Promise<MovieDetail> {
    const params = new URLSearchParams({
        apikey: key,
        i: id,
        plot: 'full',
    });

    const url = `${API_URL}?${params.toString()}`;

    const res = await fetch(url, { cache: 'force-cache' });
    const data: MovieDetail = await res.json();

    console.log('fetchMovieById response:', data);

    return data;
}