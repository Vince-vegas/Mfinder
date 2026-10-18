/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CollectMovies from '../Components/Collect-Movie/CollectMovies';
import SearchedError from '../Components/SearchedError';
import PageLoad from '../Components/ShowLoad/PageLoad';
import {
  fetchSearchedMovie,
  onResetState,
} from '../Store/NavSearch/searchReducer';
import '../Styles/genres-layout.scss';
import { useSearchParams } from 'react-router-dom';
import PagePagination from '../Components/Pagination/PagePagination';

const MovieSearched = () => {
  // get query
  const [searchParams, setSearchParams] = useSearchParams()
  const titleQuery = searchParams.get("q").trim()
  const page = Number(searchParams.get("page"))
  //

  const movieSearchState = useSelector((state) => state.movieSearched);
  const dispatch = useDispatch();

  const { searchedValue, searchedMovie, isLoading, totalPage, total_list_displayed, first_list, current_page } = movieSearchState;

  useEffect(() => {
    const promSearched = dispatch(fetchSearchedMovie({title: titleQuery, page }));

    // abort fetch when unmount
    return () => {
      promSearched.abort();
    };
  }, [searchedValue, titleQuery, page]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [current_page])

  // reset the state when unmount
  useEffect(() => {
    if(page <= 0 || !page) {
      setSearchParams({q: titleQuery, page: 1})
    }

    return () => {
      dispatch(onResetState());
    };
  }, []);

  if(!!titleQuery && searchedMovie.length === 0 && isLoading) {
    return <PageLoad />
  } else if (!titleQuery) {
    return <SearchedError text='What are you looking for? 🎬 Enter a movie title to start exploring.' />;
  } else if(!!titleQuery && searchedMovie.length === 0) {
    return <SearchedError text={`No movies found for "${titleQuery}". Try different keywords.`} />
  }

  return (
    <div className='main-collections'>
      <div className='container'>
        <div className='search-box'>
          <h1 className='search-title'>Search Results</h1>
        </div>

        {/* Show Spinner when fetching */}
        {isLoading && <PageLoad />}

        <CollectMovies moviesArray={searchedMovie} />
        <PagePagination page={page} current_page={current_page} first_list={first_list} total_list_displayed={total_list_displayed} totalPage={totalPage} />
      </div>
    </div>
  );
};

export default MovieSearched;
