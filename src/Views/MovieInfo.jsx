/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BackgroundImage from '../Components/MovieDetail/BackgroundImage';
import Overview from '../Components/MovieDetail/Overview';
import SuggestedMovies from '../Components/MovieDetail/SuggestedMovies';
import {
  fetchMovieDetails,
  fetchSuggested,
  resetState,
} from '../Store/MovieInfo/movieInfoReducer';
import '../Styles/movie-info.scss';

const MovieInfo = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const { id } = useParams();
  const movieDetailState = useSelector((state) => state.movieDetails);
  const {
    movieDetail,
    movieActors,
    trailerKey,
    moviesSuggested,
    isSuggestLoad,
    noSuggested,
  } = movieDetailState;
  const dispatch = useDispatch();

  useEffect(() => {
    const promDetails = dispatch(fetchMovieDetails({ id }));
    const promSuggested = dispatch(fetchSuggested({ id }));

    // reset the state when unmount
    return () => {
      // abort fetch when unmount
      promDetails.abort();
      promSuggested.abort();
      //
      dispatch(resetState());
    };
  }, [id]);

  return (
    <>
      <div className='mn-item-info'>
        <div className='container'>
          <BackgroundImage backdrop_path={movieDetail.backdrop_path} />
          <Overview
            movieDetails={movieDetail}
            trailerKey={trailerKey}
            movieActors={movieActors}
            isPlayTrailer={playVideo}
            onWatchTrailer={() => setPlayVideo(!playVideo)}
          />
        </div>
      </div>
      <SuggestedMovies
        isSuggestLoad={isSuggestLoad}
        suggestMovies={moviesSuggested}
        noSuggested={noSuggested}
      />
    </>
  );
};

export default MovieInfo;
