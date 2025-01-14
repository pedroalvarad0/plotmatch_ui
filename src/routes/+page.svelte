<script>
    import Movie from '../components/Movie.svelte';
    import MovieSkeleton from '../components/MovieSkeleton.svelte';

    let searchQuery = '';
    let movies = [];
    let isLoading = false;
    let searchTimeout;

    async function searchMovies(query) {
        if (!query.trim()) {
            movies = [];
            return;
        }

        try {
            isLoading = true;
            const response = await fetch(`/search?query=${encodeURIComponent(query)}&limit=5`);
            const data = await response.json();
            movies = data || [];
        } catch (error) {
            console.error('Error searching movies:', error);
            movies = [];
        } finally {
            isLoading = false;
        }
    }

    $: {
        // Debounce the search to avoid too many API calls
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchMovies(searchQuery);
        }, 300);
    }
</script>

<div class="min-h-screen flex flex-col">
    <!-- Header section -->
    <div class="bg-gray-900 border-b border-gray-800 py-4">
        <div class="container mx-auto px-4 flex flex-col md:flex-row items-center gap-6">
            <div class="flex items-center gap-3">
                <div class="text-4xl">🎬</div>
                <h1 class="text-3xl font-bold text-white">PlotMatch</h1>
            </div>
            <div class="w-full md:flex-grow">
                <div class="w-full max-w-2xl">
                    <input
                        type="text"
                        bind:value={searchQuery}
                        placeholder="Describe the movie you're looking for..."
                        class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- Results section -->
    <div class="container mx-auto px-4 py-8">
        {#if !searchQuery}
            <div class="text-center space-y-6">
                <p class="text-gray-400 text-lg max-w-xl mx-auto">
                    Search movies by plot, year, cast or director using natural language.
                </p>
            </div>
        {:else}
            <div class="space-y-4">
                {#if isLoading}
                    {#each Array(3) as _}
                        <MovieSkeleton />
                    {/each}
                {:else if movies.length > 0}
                    {#each movies as movie}
                        <Movie
                            title={movie.title}
                            genres={movie.genres}
                            overview={movie.overview}
                            release_year={movie.release_year}
                            cast={movie.movie_cast}
                            directors={movie.directors}
                            poster_path={movie.poster}
                        />
                    {/each}
                {:else}
                    <div class="text-center text-gray-400">
                        No movies found for your search.
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</div>
