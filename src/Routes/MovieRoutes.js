import { Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Main from '../Views/Main';
import PageNotFound from '../Views/PageNotFound';

// ROUTES
import HomeMovies from '../Views/HomeMovies';
import Genres from '../Views/Genres';
import MovieInfo from '../Views/MovieInfo';
import Actors from '../Views/Actors';
import ActorMovies from '../Views/ActorMovies';
import MovieSearched from '../Views/MovieSearched';
import CollectionPage from '../Views/CollectionPage';

const MovieRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/discover' element={<HomeMovies/>} key='l20r' />
        <Route path='/genre/:id' element={<Genres />} key='g40r' />
        <Route path='/title/:id' element={<MovieInfo />} />
        <Route path='/collection/:id' element={<CollectionPage />} />
        <Route path='/actors' element={<Actors />} />
        <Route path='/actor/movies/:id' element={<ActorMovies />} />
        <Route path='/search' element={<MovieSearched />} />
        <Route path='/404-page' element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404-page" replace />} />
      </Routes>
    </Fragment>
  );
};

export default MovieRoutes;
