import { createContext, useEffect, useState } from "react";

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState(() =>
        JSON.parse(localStorage.getItem("watchlist")) || []
    );

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const toggleWatchlist = (movie) => {
        const exists = watchlist.some(m => m.imdbID === movie.imdbID)

        if (!exists) {
            setWatchlist([...watchlist, movie]);
        } else {
            setWatchlist(watchlist.filter(m => m.imdbID !== movie.imdbID));
        }
    }

    return (
        <WatchListContext.Provider value={{ watchlist, toggleWatchlist }}>
            {children}
        </WatchListContext.Provider>
    )
}