import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { movieSortValue } from '../../contants/movieSortValue';

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
    totalPage: 5,
    error: {},
  },
  reducers: {
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
      // state.page = action.payload.page;
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
} = moviesSlice.actions;

const onSortPopular = () => ({ type: SORTBY_POPULAR.type });
const onSortRated = () => ({ type: SORTBY_RATED.type });
const onSortLatest = () => ({ type: SORTBY_LATEST.type });

const onSetPage = (page) => SET_PAGE({ page });
const onSetGenre = (id) => SET_GENRE({ id });

// reset the state
const onResetState = () => resetState();

export {
  onSortPopular,
  onSortRated,
  onSortLatest,
  onResetState,
  onSetPage,
  onSetGenre,
};
export default moviesSlice.reducer;
