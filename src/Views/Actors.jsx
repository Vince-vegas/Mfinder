/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActorCard from '../Components/Card/ActorCard';

import PagePagination from '../Components/Pagination/PagePagination';
import PageLoad from '../Components/ShowLoad/PageLoad';

import {
  onResetState,
  onSetPage,
  onPreviousPage,
  onNextPage,
  fetchTopActors,
} from '../Store/TopActors/actorsReducer';
import '../Styles/actors-page.scss';

const Actors = () => {
  const topActors = useSelector((state) => state.topActors);
  const dispatch = useDispatch();

  const { isLoading, actors, page, totalPage, total_list_displayed, first_list, current_page } = topActors;

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

      {actors.length && <PagePagination current_page={current_page} first_list={first_list} totalPage={totalPage} total_list_displayed={total_list_displayed} onPreviousPage={onPreviousPage} onNextPage={onNextPage} onSetPage={onSetPage} />}
    </div>
  );
};

export default Actors;
