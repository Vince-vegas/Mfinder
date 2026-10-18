/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import '../Styles/genres-layout.scss';

import { useSelector, useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

import {
  onResetState,
  fetchGenreMovies,
} from '../Store/movies/moviesReducer';
import CollectMovies from '../Components/Collect-Movie/CollectMovies';
import PageLoad from '../Components/ShowLoad/PageLoad';
import PagePagination from '../Components/Pagination/PagePagination';
import SortMoviesUI from '../Components/SortMoviesUI';

const Genres = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page"))
  const { id } = useParams();
  const moviesContext = useSelector((state) => state.moviesState);
  const dispatch = useDispatch();

  const { sorted, genreId, movies, isLoading, totalPage, total_list_displayed, first_list, current_page } = moviesContext;

  useEffect(() => {
    if(page <= 0 || !page) {
      setSearchParams({page: 1})
    }
    // the +id to convert string into Number
    const promGenres = dispatch(
      fetchGenreMovies({
        sorted,
        genreId: +id,
        pageId: page,
      })
    );

    // abort fetch when unmount
    return () => {
      console.log(1)
      promGenres.abort();
    };
  }, [sorted, page, genreId]);

  // ====================

  // reset the state when unmount
  useEffect(() => {
    return () => {
      dispatch(onResetState());
    };
  }, []);

  return (
    <div className='main-collections'>
      <div className='container'>
        <SortMoviesUI />

        {/* Show Spinner when fetching */}
        {isLoading && <PageLoad />}

        <CollectMovies moviesArray={movies} />

        {movies.length > 0 && (
          <PagePagination page={page} current_page={current_page} first_list={first_list} total_list_displayed={total_list_displayed} totalPage={totalPage} />
        )}
      </div>
    </div>
  );
};

export default Genres;
