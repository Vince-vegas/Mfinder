import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchMovieDetails = createAsyncThunk(
  'movie/FETCH_DETAILS',
  async (detailObj, thunkAPI) => {
    try {
      // scroll to top when mount
      window.scrollTo(0, 0);
      // Movie Details
      const getDetail = await fetch(
        `https://api.themoviedb.org/3/movie/${detailObj.id}?api_key=${process.env.REACT_APP_TMDB_ID}&language=en-US`,
        {
          signal: thunkAPI.signal,
        }
      );
      const detailData = await getDetail.json();

      // Youtube Trailer Key
      const getTrailerKey = await fetch(
        `https://api.themoviedb.org/3/movie/${detailObj.id}/videos?api_key=${process.env.REACT_APP_TMDB_ID}&language=en-US
    `,
        {
          signal: thunkAPI.signal,
        }
      );
      const trailerKey = await getTrailerKey.json();

      // People at Movie
      const getPeople = await fetch(
        `https://api.themoviedb.org/3/movie/${detailObj.id}/credits?api_key=${process.env.REACT_APP_TMDB_ID}
    `,
        {
          signal: thunkAPI.signal,
        }
      );
      const movieActors = await getPeople.json();

      // when a movie has no trailer key add trailerKey a string of no-trailer-key
      if (trailerKey.results.length < 1) {
        trailerKey.results.push({ key: 'no-trailer-key' });
      }

      // movie reviews
      const getReviews = await axios(
        `https://api.themoviedb.org/3/movie/${detailObj.id}/reviews?api_key=${process.env.REACT_APP_TMDB_ID}`
      );
      const reviewData = await getReviews.data;

      return {
        details: detailData,
        trailerKey,
        movieActors: movieActors.cast,
        movieId: detailObj.id,
        movieCollection: detailData?.belongs_to_collection,
        reviews: reviewData.results,
      };
    } catch (error) {
      throw new Error('404', error);
    }
  }
);

const fetchSuggested = createAsyncThunk(
  'movies/FETCH_SUGGESTED',
  async (detailsObj, thunkAPI) => {
    try {
      const movies = await fetch(
        `https://api.themoviedb.org/3/movie/${detailsObj.id}/similar?api_key=${process.env.REACT_APP_TMDB_ID}&language=en-US&page=1`,
        {
          signal: thunkAPI.signal,
        }
      );
      const data = await movies.json();

      // set NoSuggested Movies when suggested movie is not implemented on database
      if (data.results.length < 1) {
        console.log(thunkAPI);

        thunkAPI.dispatch(NO_SUGGESTED());
      }

      // total items is 20
      // I slice the array for 12 items
      // only 12 items for great user experience
      return data.results.slice(0, 12);
    } catch (error) {
      throw new Error(error);
    }
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movieId: '',
    isDetailsLoad: false,
    movieDetail: {},
    movieActors: [],
    movieCollection: null,
    trailerKey: '',
    isPlayTrailer: false,
    moviesSuggested: [],
    isSuggestLoad: false,
    noSuggested: false,
    reviews: [],
    error: {},
  },
  reducers: {
    NO_SUGGESTED: (state) => {
      state.isSuggestLoad = false;
      state.noSuggested = true;
    },
    resetState: (state) => {
      state.movieId = '';
      state.isDetailsLoad = false;
      state.movieDetail = {};
      state.movieActors = [];
      state.trailerKey = '';
      state.isPlayTrailer = false;
      state.moviesSuggested = [];
      state.movieCollection = null;
      state.isSuggestLoad = false;
      state.noSuggested = false;
      state.reviews = [];
      state.error = {};
    },
  },
  extraReducers: {
    [fetchMovieDetails.pending]: (state) => {
      state.isDetailsLoad = true;
    },
    [fetchMovieDetails.rejected]: (state, action) => {
      state.isDetailsLoad = false;
      state.error = action.error;
    },
    [fetchMovieDetails.fulfilled]: (state, action) => {
      state.isDetailsLoad = false;
      state.movieId = action.payload.movieId;
      state.movieDetail = action.payload.details;
      state.trailerKey = action.payload.trailerKey.results[0].key;
      state.movieActors = action.payload.movieActors;
      state.movieCollection = action.payload.movieCollection;
      state.reviews = action.payload.reviews;
    },
    [fetchSuggested.pending]: (state) => {
      state.isSuggestLoad = true;
    },
    [fetchSuggested.rejected]: (state) => {
      state.isSuggestLoad = false;
      state.noSuggested = true;
    },
    [fetchSuggested.fulfilled]: (state, action) => {
      state.isSuggestLoad = false;
      state.moviesSuggested = action.payload;
    },
  },
});

export const { resetState, NO_SUGGESTED } = movieSlice.actions;

export { fetchMovieDetails, fetchSuggested };
export default movieSlice.reducer;
