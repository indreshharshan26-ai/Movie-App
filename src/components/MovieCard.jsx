import React, { useContext, useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { WatchListContext } from '../context/WatchListContext'

const OMDB_API_KEY = 'ac9bdb55' // your key

const MovieCard = ({ movie }) => {
  const { toggleWatchlist, watchlist } = useContext(WatchListContext)
  const inWatchList = watchlist.some(m => m.imdbID === movie.imdbID)

  // imgSrc will start with whatever OMDb returned (if present)
  const initialPoster =
    movie?.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : null

  const [imgSrc, setImgSrc] = useState(initialPoster)
  const [triedOmdbImg, setTriedOmdbImg] = useState(false)
  const [broken, setBroken] = useState(false) // final fallback reached

  const placeholder = "https://via.placeholder.com/500x750?text=No+Image+Available"

  const handleImageError = () => {
    // If original poster failed and we haven't tried the OMDb image-server, try it
    if (!triedOmdbImg && movie?.imdbID) {
      // Use img.omdbapi.com endpoint which returns poster by imdbID and avoids some Amazon redirects/CORS
      const omdbImgUrl = `https://img.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`
      setTriedOmdbImg(true)
      setImgSrc(omdbImgUrl)
      return
    }

    // If we already tried OMDb server or there's no imdbID, set final placeholder
    if (!broken) {
      setBroken(true)
      setImgSrc(placeholder)
      return
    }
  }

  // If there's no poster at all to start with, immediately try OMDb image-server (best chance)
  // This runs once on mount: if initialPoster is null and we have imdbID, set that URL
  React.useEffect(() => {
    if (!initialPoster && movie?.imdbID && !triedOmdbImg) {
      setTriedOmdbImg(true)
      setImgSrc(`https://img.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`)
    }

    // If nothing exists, ensure placeholder
    if (!initialPoster && !movie?.imdbID) {
      setBroken(true)
      setImgSrc(placeholder)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='bg-gray-800 p-4 rounded-lg shadow-md text-white relative'>
      <div className="w-full h-80 flex items-center justify-center bg-gray-700/30 rounded-sm overflow-hidden">
        <img
          src={imgSrc || placeholder}
          alt={movie?.Title || "No title"}
          onError={handleImageError}
          className="w-full h-full object-contain"
          crossOrigin="anonymous"
        />
      </div>

      <h3 className='text-lg font-bold mt-4 truncate'>{movie?.Title}</h3>
      <p className='text-sm text-gray-300'>{movie?.Year}</p>

      {/* if final placeholder, show small note */}
      {imgSrc === placeholder && (
        <p className="text-xs text-gray-400 mt-1">Poster not available</p>
      )}

      <button
        className='absolute top-2 right-2 text-red-500 text-2xl'
        onClick={() => toggleWatchlist(movie)}
        aria-label={inWatchList ? "Remove from watchlist" : "Add to watchlist"}
      >
        {inWatchList ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  )
}

export default MovieCard