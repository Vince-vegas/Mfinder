/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import '../Styles/genres-layout.scss';

import { useSelector, useDispatch } from 'react-redux';

import {
  fetchHomeMovies,
  onResetState,
  onSetPage,
} from '../Store/movies/moviesReducer';
import CollectMovies from '../Components/Collect-Movie/CollectMovies';
import PageLoad from '../Components/ShowLoad/PageLoad';
import PagePagination from '../Components/Pagination/PagePagination';
import Carousel from '../Components/Carousel/Carousel';
import SortMoviesUI from '../Components/SortMoviesUI';

const HomeMovies = () => {
  const moviesContext = useSelector((state) => state.moviesState);
  const dispatch = useDispatch();

  const { sorted, page, movies, isLoading, totalPage } = moviesContext;

  useEffect(() => {
    // console.log(moviesContext);
    // the * to conver string into Number
    const promMovies = dispatch(fetchHomeMovies({ sorted, page }));

    // abort fetch when unmount
    return () => {
      promMovies.abort();
    };
  }, [sorted, page]);

  // ====================

  const handleSetPage = (id) => {
    dispatch(onSetPage(id));
  };

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
          <PagePagination
            totalPagination={totalPage}
            currentPage={page}
            handleClick={handleSetPage}
          />
        )}
      </div>
    </div>
  );
};

export default HomeMovies;
