import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'

const Home = () => {

    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("avengers")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        if (!search) return;

        let url = `https://www.omdbapi.com/?apikey=ac9bdb55&s=${search}&page=${page}`

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.Search || [])
                setTotalPages(Math.ceil((data.totalResults || 0) / 10))
            })
    }, [search, page])

    return (
        <div className='p-4 pt-16'>
            <input type="text"
                placeholder="Search movies..."
                className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900/60 text-white backdrop-blur-md fixed top-16 left-1/2 transform -translate-x-1/2 z-10"
                onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1) // reset page on search change
                }}
            />

            <div className="movies-container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
                {movies.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>

            {movies.length > 0 && (
                <div className="pagination-container flex justify-between mt-5">
                    <button
                        disabled={page === 1}
                        className='p-2 bg-gray-700 text-white rounded disabled:opacity-50'
                        onClick={() => setPage(prev => prev - 1)}
                    >
                        PREV
                    </button>

                    <p className='text-white my-auto'>Page {page} / {totalPages}</p>

                    <button
                        disabled={page === totalPages}
                        className='p-2 bg-gray-700 text-white rounded disabled:opacity-50'
                        onClick={() => setPage(prev => prev + 1)}
                    >
                        NEXT
                    </button>
                </div>
            )}
        </div>
    )
}

export default Home