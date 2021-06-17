import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

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

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/home' component={HomeMovies} key='l20r' />
        <Route exact path='/genre/:id' component={Genres} key='g40r' />
        <Route exact path='/title/:id' component={MovieInfo} />
        <Route exact path='/collection/:id' component={CollectionPage} />
        <Route exact path='/actors' component={Actors} />
        <Route exact path='/actor/movies/:id' component={ActorMovies} />
        <Route exact path='/search' component={MovieSearched} />
        <Route exact path='/404-page' component={PageNotFound} />
        <Redirect to='/404-page' />
      </Switch>
    </Fragment>
  );
};

export default Routes;
