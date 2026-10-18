import { useSearchParams } from 'react-router-dom';
import { movieSortValue } from '../contants/movieSortValue'
import TrendList from './TrendList'
import { useDispatch, useSelector } from 'react-redux'
import { onSortLatest, onSortPopular, onSortRated } from '../Store/movies/moviesReducer'

const SortMoviesUI = () => {
  const [, setSearchParams] = useSearchParams()
  const moviesContext = useSelector((state) => state.moviesState);
  const dispatch = useDispatch()

  const { sorted } = moviesContext;

  // Sorting functions
  const sortToPopular = () => {
    dispatch(onSortPopular());
    setSearchParams({ page: 1 })
  };
  const sortToRated = () => {
    dispatch(onSortRated());
    setSearchParams({ page: 1 })
  };
  const sortToLatest = () => {
    dispatch(onSortLatest());
    setSearchParams({ page: 1 })
  };

  return (
    <div className='collection-opt mb40'>
      <ul className='sort-menu'>
        <TrendList
          text='Hot'
          handleEvent={sortToPopular}
          sortValue={movieSortValue.popularity}
          currentSort={sorted}
        />
        <TrendList
          text='Top Rated'
          handleEvent={sortToRated}
          sortValue={movieSortValue.top_rated}
          currentSort={sorted}
        />
        <TrendList
          text='Now Playing'
          handleEvent={sortToLatest}
          sortValue={movieSortValue.now_playing}
          currentSort={sorted}
        />
      </ul>
    </div>
  )
}

export default SortMoviesUI