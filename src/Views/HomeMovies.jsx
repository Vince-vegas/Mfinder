/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import '../Styles/genres-layout.scss';

import { useSelector, useDispatch } from 'react-redux';

import {
  fetchHomeMovies,
  onSortPopular,
  onSortRated,
  onSortLatest,
  onResetState,
  onSetPage,
} from '../Store/movies/moviesReducer';
import SortLayout from '../Components/SortLayout';
import TrendList from '../Components/TrendList';
import CollectMovies from '../Components/Collect-Movie/CollectMovies';
import PageLoad from '../Components/ShowLoad/PageLoad';
import PagePagination from '../Components/Pagination/PagePagination';
import Carousel from '../Components/Carousel/Carousel';

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

  // Sorting functions
  const sortToPopular = () => {
    dispatch(onSortPopular());
  };
  const sortToRated = () => {
    dispatch(onSortRated());
  };
  const sortToLatest = () => {
    dispatch(onSortLatest());
  };
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
        <Carousel />
        <SortLayout>
          <TrendList
            text='Hot'
            handleEvent={sortToPopular}
            sortValue='popular'
            currentSort={sorted}
          />
          <TrendList
            text='Top Rated'
            handleEvent={sortToRated}
            sortValue='top_rated'
            currentSort={sorted}
          />
          <TrendList
            text='Now Playing'
            handleEvent={sortToLatest}
            sortValue='now_playing'
            currentSort={sorted}
          />
        </SortLayout>

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
