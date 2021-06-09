/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActorCard from '../Components/Card/ActorCard';

import PagePagination from '../Components/Pagination/PagePagination';
import PageLoad from '../Components/ShowLoad/PageLoad';

import {
  onResetState,
  onSetPage,
  fetchTopActors,
} from '../Store/TopActors/actorsReducer';
import '../Styles/actors-page.scss';

const Actors = () => {
  const topActors = useSelector((state) => state.topActors);
  const dispatch = useDispatch();

  const { isLoading, actors, page, totalPage } = topActors;

  const handleSetPage = (id) => {
    dispatch(onSetPage(id));
  };

  useEffect(() => {
    const promActors = dispatch(fetchTopActors(page));

    // abort fetch when unmount
    return () => {
      promActors.abort();
    };
  }, [page]);

  // reset the state when unmount page
  useEffect(() => {
    return () => {
      dispatch(onResetState());
    };
  }, []);

  return (
    <div className='mn-actors'>
      <div className='container'>
        <h1 className='title mb30'>Top 100 Actors</h1>

        <div className='row space-between'>
          {actors.map(({ id, ...otherProps }) => {
            return <ActorCard key={id} {...otherProps} movieId={id} />;
          })}
        </div>
      </div>

      {/* Show Spinner when fetching */}
      {isLoading && <PageLoad />}

      <PagePagination
        totalPagination={totalPage}
        currentPage={page}
        handleClick={handleSetPage}
      />
    </div>
  );
};

export default Actors;
