import { useEffect, useMemo, useState } from "react"
import { debounce } from "../Utils/debounce"


export const useGetMovieSelection = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [noMovies, setNoMovies] = useState(false)
  const [searchVal, setSearchVal] = useState('');
  const [showSelection, setShowSelection] = useState(false)

   const handleSearchDebounce = useMemo(() => {
    return debounce(async (searchVal) => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?language=en-US&query=${searchVal}&page=1&include_adult=false`, {
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

        setShowSelection(true)
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
    if (!searchVal.trim()) {
      setMovies([])
      setIsLoading(false)
      handleSearchDebounce.cancel()
      return;
    }
    
    setIsLoading(true)
    handleSearchDebounce(searchVal)

    return () => {
      handleSearchDebounce.cancel()
    }
  }, [searchVal])

  const resetSearching = () => {
    handleSearchDebounce.cancel()
    setIsLoading(false)
    setNoMovies(false)
    setSearchVal("")
    setShowSelection(false)
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchVal(value);
  };

  return { moviesToDisplay: movies, isLoading, resetSearching, noMovies, searchVal, handleSearch, showSelection, setShowSelection }
}