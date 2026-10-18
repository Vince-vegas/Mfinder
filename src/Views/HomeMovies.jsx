/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import '../Styles/genres-layout.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchHomeMovies,
  onResetState,
} from '../Store/movies/moviesReducer';
import CollectMovies from '../Components/Collect-Movie/CollectMovies';
import PageLoad from '../Components/ShowLoad/PageLoad';
import PagePagination from '../Components/Pagination/PagePagination';
import Carousel from '../Components/Carousel/Carousel';
import SortMoviesUI from '../Components/SortMoviesUI';
import { movieSortValue } from '../contants/movieSortValue';
import { useSearchParams } from 'react-router-dom';

const HomeMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page"))

  const dispatch = useDispatch();
  const carouselRef = useRef(null)
  const previousPage = useRef(1)
  const previousSortMovie = useRef(movieSortValue.popularity)

  const moviesContext = useSelector((state) => state.moviesState);
  const { sorted, movies, isLoading, totalPage, total_list_displayed, first_list, current_page } = moviesContext;

  useEffect(() => {
    // console.log(moviesContext);
    // the * to conver string into Number
    const promMovies = dispatch(fetchHomeMovies({ sorted, page: page }));

    // abort fetch when unmount
    return () => {
      promMovies.abort();
    };
  }, [sorted, page]);
  
  // reset the state when unmount
  useEffect(() => {
    window.scrollTo(0, 0)
    if(page <= 0 || !page) {
      setSearchParams({page: 1})
    }
    return () => {
      dispatch(onResetState());
    };
  }, []);

  useEffect(() => {
    const elementCarousel = carouselRef.current
    const navigationHeight = 60;

    if(!elementCarousel) return;

    const rect = elementCarousel.getBoundingClientRect();
    const y = (rect.bottom + window.scrollY) - navigationHeight;

    if(previousPage.current !== current_page && previousSortMovie.current === sorted) {
      window.scrollTo({
        top: y,
        behavior: "instant"
      })
      previousPage.current = current_page;
    }
    previousSortMovie.current = sorted;
  }, [current_page])

  return (
    <div className='main-collections'>
      <div className='container'>
        {/* Show Carousel and SortMoviesUI at first homepage component mount */}
        {movies.length > 0 && (
          <>
            <Carousel ref={carouselRef} />
            <SortMoviesUI />
          </>
        )}

        {/* Show Spinner when fetching */}
        {isLoading && <PageLoad />}

        <CollectMovies moviesArray={movies} />
        {movies.length > 0 && (
          <PagePagination page={page} current_page={current_page} first_list={first_list} total_list_displayed={total_list_displayed} totalPage={totalPage} />
        )}
      </div>
    </div>
  );
};

export default HomeMovies;
