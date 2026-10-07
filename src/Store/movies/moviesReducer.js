import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { movieSortValue } from '../../contants/movieSortValue';

console.warn = function() {}

export const fetchHomeMovies = createAsyncThunk(
  'movies/FETCH_MOVIES',
  async (moviesObj, thunkAPI) => {
    try {
      const getMovies = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${moviesObj.page}&sort_by=${moviesObj.sorted}`,
        { signal: thunkAPI.signal, headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ID_AUTHORIZATION}`,
        }}
      );
      const data = await getMovies.json();
      window.scrollTo(0, 0);
      return data;
    } catch (error) {
      throw Error('404 test');
    }
  }
);

export const fetchGenreMovies = createAsyncThunk(
  'movies/FETCH_GENRE_MOVIES',
  async (moviesObj, thunkAPI) => {
    try {
      const getMovies = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${moviesObj.pageId}&sort_by=${moviesObj.sorted}&with_genres=${moviesObj.genreId}`,
        { signal: thunkAPI.signal, headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ID_AUTHORIZATION}`,
        }}
      );
      const data = await getMovies.json();
      // Scroll to Top when Pagination clicked
      window.scrollTo(0, 0);
      return {
        movies: data,
        genreId: moviesObj.genreId,
      };
    } catch (error) {
      // Scroll to Top when Pagination clicked
      window.scrollTo(0, 0);
      throw Error('404 test');
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    isLoading: false,
    sorted: movieSortValue.popularity,
    page: 1,
    genreId: 28,
    first_list: 1,
    current_page: 1,
    totalPage: null,
    total_list_displayed: 4,
    TMDB_MAX_PAGINATION: 500,
    error: {},
  },
  reducers: {
    PREVIOUS_PAGE: (state) => {
      state.isLoading = true;
      state.page = state.page - 1;
    },
    NEXT_PAGE: (state) => {
      state.isLoading = true;
      state.page = state.page + 1;
    },
    SORTBY_POPULAR: (state) => {
      state.sorted = movieSortValue.popularity;
      state.page = 1;
    },
    SORTBY_RATED: (state) => {
      state.sorted = movieSortValue.top_rated;
      state.page = 1;
    },
    SORTBY_LATEST: (state) => {
      state.sorted = movieSortValue.now_playing;
      state.page = 1;
    },
    SET_PAGE: (state, action) => {
      state.isLoading = true;
      state.page = action.payload.page;
    },
    SET_GENRE: (state, action) => {
      state.genreId = action.payload.id;
    },
    resetState: (state) => {
      state.isLoading = false;
      state.sorted = movieSortValue.popularity;
      state.movies = [];
      state.page = 1;
      state.genreId = 28;
      state.totalPage = null;
      state.error = {};
    },
  },
  extraReducers: {
    [fetchHomeMovies.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchHomeMovies.rejected]: (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    },
    [fetchHomeMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload.results;
      state.totalPage = action.payload.total_pages > state.TMDB_MAX_PAGINATION ? state.TMDB_MAX_PAGINATION : action.payload.total_pages;
      state.current_page = action.payload.page
    },
    [fetchGenreMovies.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchGenreMovies.rejected]: (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    },
    [fetchGenreMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload.movies.results;
      state.page = action.payload.movies.page;
      state.genreId = action.payload.genreId;
      state.totalPage = action.payload.movies.total_pages > state.TMDB_MAX_PAGINATION ? state.TMDB_MAX_PAGINATION : action.payload.movies.total_pages;
    },
  },
});

const {
  SORTBY_POPULAR,
  SORTBY_RATED,
  SORTBY_LATEST,
  SET_PAGE,
  SET_GENRE,
  resetState,
  PREVIOUS_PAGE,
  NEXT_PAGE
} = moviesSlice.actions;

const onSortPopular = () => ({ type: SORTBY_POPULAR.type });
const onSortRated = () => ({ type: SORTBY_RATED.type });
const onSortLatest = () => ({ type: SORTBY_LATEST.type });

const onSetPage = (page) => SET_PAGE({ page });
const onSetGenre = (id) => SET_GENRE({ id });

const onPreviousPage = () => PREVIOUS_PAGE()
const onNextPage = () => NEXT_PAGE()

// reset the state
const onResetState = () => resetState();

export {
  onSortPopular,
  onSortRated,
  onSortLatest,
  onResetState,
  onSetPage,
  onSetGenre,
  onPreviousPage,
  onNextPage
};
export default moviesSlice.reducer;
