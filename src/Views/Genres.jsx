/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import '../Styles/genres-layout.scss';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  onResetState,
  fetchGenreMovies,
  onSetPage,
} from '../Store/movies/moviesReducer';
import CollectMovies from '../Components/Collect-Movie/CollectMovies';
import PageLoad from '../Components/ShowLoad/PageLoad';
import PagePagination from '../Components/Pagination/PagePagination';
import SortMoviesUI from '../Components/SortMoviesUI';

const Genres = () => {
  const { id } = useParams();
  const moviesContext = useSelector((state) => state.moviesState);
  const dispatch = useDispatch();

  const { sorted, page, movies, genreId, isLoading, totalPage } = moviesContext;

  useEffect(() => {
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
      promGenres.abort();
    };
  }, [sorted, page, genreId]);

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
        <SortMoviesUI />

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
