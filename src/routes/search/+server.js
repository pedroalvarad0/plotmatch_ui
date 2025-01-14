import { json } from '@sveltejs/kit';
import { pool } from '$lib/db';
import { generateEmbedding } from '$lib/openai';

export async function GET({ url }) {
    const query = url.searchParams.get('query') || '';
    const limit = Number(url.searchParams.get('limit')) || 5;

    const embedding = await generateEmbedding(query);

    if (!query) {
        return json([]);
    }

    try {
        // Query to get the most similar movie IDs using pgvector
        const query_ids = `
            SELECT
                movie_id,
                embedding,
                embedding <=> $1::vector as distance
            FROM movie_embeddings
            ORDER BY distance ASC
            LIMIT $2;
        `;

        const result_movie_ids = await pool.query(query_ids, [JSON.stringify(embedding), limit]);
        
        const movie_ids = result_movie_ids.rows.map(row => row.movie_id);
        
        if (movie_ids.length === 0) {
            return json([]);
        }

        const query_movies = `
            SELECT
                id,
                title,
                genres,
                overview,
                release_year,
                movie_cast,
                directors,
                poster
            FROM movies
            WHERE id = ANY($1::int[]);
        `;

        const result_movies = await pool.query(query_movies, [movie_ids]);

        const moviesWithFullPosterUrl = result_movies.rows.map(movie => ({
            ...movie,
            poster: movie.poster ? `https://image.tmdb.org/t/p/original${movie.poster}` : null
        }));
        
        return json(moviesWithFullPosterUrl);
    } catch (error) {
        console.error('Error searching movies:', error);
        return json([]);
    }
}