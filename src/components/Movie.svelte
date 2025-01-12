<script>
    export let title;
    export let genres;
    export let overview;
    export let release_year;
    export let cast;
    export let directors;
    export let poster_path;
</script>

<div class="flex flex-col md:flex-row gap-6 bg-gray-800 rounded-lg p-4 shadow-md mb-4 border border-gray-700">
    <div class="flex-shrink-0">
        <img 
            src={poster_path} 
            alt={title} 
            class="w-full md:w-[200px] h-auto md:h-[300px] object-cover rounded-md"
        />
    </div>
    <div class="flex-1">
        <h2 class="text-2xl text-white mb-2">
            {title} <span class="font-normal text-gray-400">({release_year})</span>
        </h2>
        
        <div class="flex flex-wrap gap-2 mb-4">
            {#each genres.split(',') as genre}
                <span class="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">{genre.trim()}</span>
            {/each}
        </div>

        <p class="text-gray-300 leading-relaxed mb-4">{overview}</p>

        <div class="space-y-2 text-sm">
            <div class="text-gray-300">
                <strong class="mr-2">Directors:</strong>
                {directors}
            </div>
            <div class="text-gray-300">
                <strong class="mr-2">Cast:</strong>
                {cast}
            </div>
        </div>
    </div>
</div>