/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CollectMovies from '../Components/Collect-Movie/CollectMovies';
import SearchedError from '../Components/SearchedError';
import PageLoad from '../Components/ShowLoad/PageLoad';
import {
  fetchSearchedMovie,
  onResetState,
} from '../Store/NavSearch/searchReducer';
import '../Styles/genres-layout.scss';

const MovieSearched = (props) => {
  // get query
  const query = new URLSearchParams(props.location.search);
  const titleQuery = query.get('q').trim();
  //

  const movieSearchState = useSelector((state) => state.movieSearched);
  const dispatch = useDispatch();

  const { searchedValue, searchedMovie, isLoading } = movieSearchState;

  useEffect(() => {
    const promSearched = dispatch(fetchSearchedMovie(titleQuery));

    // abort fetch when unmount
    return () => {
      promSearched.abort();
    };
  }, [searchedValue]);

  // reset the state when unmount
  useEffect(() => {
    return () => {
      dispatch(onResetState());
    };
  }, []);

  if (!titleQuery) {
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
      </div>
    </div>
  );
};

export default MovieSearched;
