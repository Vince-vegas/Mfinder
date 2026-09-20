import { useState, Fragment, useRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import SearchIcon from '../Assets/SvgIcon/SearchIcon';
import { fetchSearchedMovie, onSetSearch, onResetState } from '../Store/NavSearch/searchReducer';
import { debounce } from '../Utils/debounce';

const NavSearch = () => {
  // =======================
  let history = useHistory();
  let searchRef = useRef(null)
  const [searchVal, setSearchVal] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [showSelection, setShowSelection] = useState(false)

  const movieSearchState = useSelector((state) => state.movieSearched);
  const { genres } = useSelector((state) => state.navHandlers);

  const { searchedMovie } = movieSearchState;
  const dispatch = useDispatch();

  // TMDB v3 returns up to 20 results, limit the displayed suggestions to 4 on the client.
  // TMDB doesn't provide a result limit for this endpoint yet
  const moviesToDisplay = searchedMovie.slice(0, 4)

  const handleShowCollection = () => {
    setShowSelection(true)
  }

  const resetSearchInput = () => {
    setShowSelection(false)
    setSearchVal('');
    onResetState()
    dispatch(onResetState())
  }

  const handleSearchDebounce = useMemo(() => {
    return debounce((value) => {
      dispatch(fetchSearchedMovie(value))
      setIsLoading(false)
    }, 1000)
  }, [dispatch])

  const handleSearch = (e) => {
    const { value } = e.target;
    setIsLoading(true)
    setSearchVal(value);
    handleSearchDebounce(value)
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();

    dispatch(onSetSearch(searchVal));
    // route /search
    history.push(`/search?q=${searchVal}`);
    setSearchVal('')
  };
  // ==================================

  useEffect(() => {
 const handleClickOutside = (e) => {
    if (!searchRef.current?.contains(e.target)) {
      setShowSelection(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  return (
    <Fragment>
      <div className={showSelection ? "nav-search nav-search-focus": "nav-search"} ref={searchRef}>
        <form className='search-form' onSubmit={onSubmitSearch}>
          <button type='submit'>
            <SearchIcon />
          </button>
          <div className='search-input'>
            <input
              name='name'
              type='text'
              placeholder='Search for a movie...'
              autoComplete='off'
              className='sm-input'
              value={searchVal}
              onChange={handleSearch}
              onFocus={handleShowCollection}
              // onBlur={handleIsNotFocused}
            />
            {isLoading && <span className="search-spinner"></span>}
            {searchVal && (
              <button type="button" className="reset-search" onClick={resetSearchInput}>
                <svg className='exit-icon' data-slot="icon" fill="none" stroke-width="3.0" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}
          </div>
        </form>

        {(showSelection) && (
          <div className='selection-container'>
            {moviesToDisplay.length > 0 && (
              <p className='sub-text'>Movies</p>
            )}
            
            {moviesToDisplay.map((movie) => {
              return <Link onClick={resetSearchInput} key={movie.id} className="selection" to={`/title/${movie.id}`}>
              <div className='movie'>
                <div className="photo">
                  <img src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path
                  }`} alt={movie.title} />
                </div>
                <div className="details">
                  <div className="title">{movie.title}</div>
                  <div className='sub-detail'>
                    <span className='year'>{new Date(movie.release_date).getFullYear()}</span>
                    <ul className='genres-list'>
                      {movie.genre_ids.slice(0,3).map((genre) => {
                        return (
                          <li key={genre}>
                            <span className="dot">•</span>
                            <span className='genre' key={genre}>{genres.find(item => item.id === genre).name}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div className="rating"><span className="star">★</span> {Number(movie.vote_average.toFixed(1))}</div>
                </div>
              </div>
              <div className='movie-arrow'>
                <svg height={15} width={15} data-slot="icon" fill="none" strokeWidth="3.00" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                </svg>
              </div>
            </Link>
            })}

            {moviesToDisplay.length === 0 && (
              <p className='start-typing'>Start typing to discover movies</p>
            )}
            <Link onClick={resetSearchInput} className='search-for' to={`/search?q=${searchVal}`}>
              <button type='submit'>
                <SearchIcon />
              </button>
              <p>Search for {searchVal.length > 0 ? `"${searchVal}"`: "a movie"}</p>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default NavSearch;
