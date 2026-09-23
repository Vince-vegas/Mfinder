import { useEffect, useMemo, useState } from "react"
import { debounce } from "../Utils/debounce"


export const useGetMovieSelection = (movieName) => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [noMovies, setNoMovies] = useState(false)

   const handleSearchDebounce = useMemo(() => {
    return debounce(async (movieName) => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?language=en-US&query=${movieName}&page=1&include_adult=false`, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ID_AUTHORIZATION}`,
          }
        })

        if(!res.ok) {
          throw new Error("Something wrong while fetching data...")
        }

        const data = await res.json()

        // TMDB v3 returns up to 20 results, limit the displayed suggestions to 4 on the client.
        // TMDB doesn't provide a result limit for this endpoint yet
        const results = data.results.slice(0, 4)

        setMovies(results)
        if(results.length === 0) {
          setNoMovies(true)
          return;
        }
        setNoMovies(false)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }, [])
  
  useEffect(() => {
    if (!movieName.trim()) {
      setMovies([])
      setIsLoading(false)
      handleSearchDebounce.cancel()
      return;
    }
    
    setIsLoading(true)
    handleSearchDebounce(movieName)

    return () => {
      handleSearchDebounce.cancel()
    }
  }, [movieName])

  const cancelSearching = () => {
    handleSearchDebounce.cancel()
    setIsLoading(false)
    setNoMovies(false)
  }

  return { moviesToDisplay: movies, isLoading, cancelSearching, noMovies }
}