/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import '../Styles/genres-layout.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchHomeMovies,
  onResetState,
  onNextPage, 
  onPreviousPage, 
  onSetPage
} from '../Store/movies/moviesReducer';
import CollectMovies from '../Components/Collect-Movie/CollectMovies';
import PageLoad from '../Components/ShowLoad/PageLoad';
import PagePagination from '../Components/Pagination/PagePagination';
import Carousel from '../Components/Carousel/Carousel';
import SortMoviesUI from '../Components/SortMoviesUI';

const HomeMovies = () => {
  const moviesContext = useSelector((state) => state.moviesState);
  const dispatch = useDispatch();

  const { sorted, page, movies, isLoading, totalPage, total_list_displayed, first_list, current_page } = moviesContext;

  useEffect(() => {
    // console.log(moviesContext);
    // the * to conver string into Number
    const promMovies = dispatch(fetchHomeMovies({ sorted, page }));

    // abort fetch when unmount
    return () => {
      promMovies.abort();
    };
  }, [sorted, page]);
  
  // reset the state when unmount
  useEffect(() => {
    return () => {
      dispatch(onResetState());
    };
  }, []);

  return (
    <div className='main-collections'>
      <div className='container'>
        {/* Show Carousel and SortMoviesUI at first homepage component mount */}
        {movies.length > 0 && (
          <>
            <Carousel />
            <SortMoviesUI />
          </>
        )}

        {/* Show Spinner when fetching */}
        {isLoading && <PageLoad />}

        <CollectMovies moviesArray={movies} />
        {movies.length > 0 && (
          <PagePagination current_page={current_page} first_list={first_list} total_list_displayed={total_list_displayed} totalPage={totalPage} onPreviousPage={onPreviousPage} onNextPage={onNextPage} onSetPage={onSetPage} />
        )}
      </div>
    </div>
  );
};

export default HomeMovies;
