/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import '../Styles/genres-layout.scss';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  onSortPopular,
  onSortRated,
  onSortLatest,
  onResetState,
  fetchGenreMovies,
  onSetPage,
} from '../Store/movies/moviesReducer';
import SortLayout from '../Components/Layout/SortLayout';
import TrendList from '../Components/TrendList';
import CollectMovies from '../Components/Collect-Movie/CollectMovies';
import PageLoad from '../Components/ShowLoad/PageLoad';
import PagePagination from '../Components/Pagination/PagePagination';

const Genres = () => {
  const { id } = useParams();
  const moviesContext = useSelector((state) => state.moviesState);
  const dispatch = useDispatch();

  const { sorted, page, movies, genreId, isLoading, totalPage } = moviesContext;

  useEffect(() => {
    // the +id to conver string into Number
    const promGenres = dispatch(
      fetchGenreMovies({
        sorted,
        genreId: +id,
        pageId: page,
      })
    );

    // abort fetch when unmount
    return () => {
      promGenres.abort();
    };
  }, [sorted, page, genreId]);

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

export default Genres;
