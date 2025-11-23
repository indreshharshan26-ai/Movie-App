import React, { useContext, useState } from 'react'
import { WatchListContext } from '../context/WatchListContext'
import MovieCard from '../components/MovieCard'

const WatchList = () => {
    const { watchlist } = useContext(WatchListContext)
    const [search, setSearch] = useState("")

    const filteredMovies = watchlist.filter((movie) =>
        movie.Title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='p-4 pt-16'>
            <input
                type="text"
                placeholder='Search movies...'
                className='p-2 w-3/4 md:1/2 border rounded border-gray-700 bg-gray-900/60 text-white backdrop-blur-md fixed top-16 left-1/2 transform -translate-x-1/2 z-10'
                onChange={(e) => setSearch(e.target.value)} />

            <div className="movies-container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
                {filteredMovies.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default WatchList