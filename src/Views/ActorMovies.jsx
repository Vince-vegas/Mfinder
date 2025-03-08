/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchActorMovies,
  resetState,
} from '../Store/ActorMovies/actorMoviesReducer';
import CollectMovies from '../Components/Collect-Movie/CollectMovies';
import { useSelector, useDispatch } from 'react-redux';
import '../Styles/genres-layout.scss';
import PageLoad from '../Components/ShowLoad/PageLoad';

const ActorMovies = () => {
  const actorMoviesState = useSelector((state) => state.actorMovies);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { movies, actorDetail, isLoading } = actorMoviesState;

  useEffect(() => {
    const promActorMovies = dispatch(fetchActorMovies(+id));
    window.scroll(0, 0)

    // reset the state when unmount

    return () => {
      // abort fetch when unmount
      promActorMovies.abort();
      //
      dispatch(resetState());
    };
  }, []);

  return (
    <div className='main-collections'>
      <div className='container'>
        <div className='search-box'>
          <h1 className='search-title'>
            {actorDetail.name
              ? `${actorDetail.name}'s Movies`
              : 'His/Her movies'}
          </h1>
        </div>

        {/* Show Spinner when fetching */}
        {isLoading && <PageLoad />}

        {movies && <CollectMovies moviesArray={movies} />}
      </div>
    </div>
  );
};

export default ActorMovies;
