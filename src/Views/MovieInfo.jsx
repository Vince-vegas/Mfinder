/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BackgroundImage from '../Components/MovieDetail/BackgroundImage';
import Collection from '../Components/MovieDetail/Collection';
import Overview from '../Components/MovieDetail/Overview';
import Reviews from '../Components/MovieDetail/Reviews';
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
    movieCollection,
    movieActors,
    trailerKey,
    moviesSuggested,
    isSuggestLoad,
    noSuggested,
    reviews,
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
  console.log(reviews);
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

      <div className='container'>
        {movieCollection && (
          <Collection
            name={movieCollection.name}
            background={movieCollection.backdrop_path}
            collectionId={movieCollection.id}
          />
        )}

        <SuggestedMovies
          isSuggestLoad={isSuggestLoad}
          suggestMovies={moviesSuggested}
          noSuggested={noSuggested}
        />

        {reviews.length > 0 && <Reviews reviews={reviews} />}
      </div>
    </>
  );
};

export default MovieInfo;
