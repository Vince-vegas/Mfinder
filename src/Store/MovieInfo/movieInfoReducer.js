import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../Utils/fetchData';

const fetchMovieDetails = createAsyncThunk(
  'movie/FETCH_DETAILS',
  async (detailObj, thunkAPI) => {
    try {
      // scroll to top when mount
      window.scrollTo(0, 0);
      // Movie Details
      const id = detailObj.id

      const [details, trailer, people, reviews] = await Promise.all([
        fetchData(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, thunkAPI),
        fetchData(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, thunkAPI),
        fetchData(`https://api.themoviedb.org/3/movie/${id}/credits`, thunkAPI),
        fetchData(`https://api.themoviedb.org/3/movie/${id}/reviews`, thunkAPI)
      ])

      // when a movie has no trailer key add trailer key a string of no-trailer-key
      if (trailer.results.length < 1) {
        trailer.results.push({ key: 'no-trailer-key' });
      }

      return {
        details: details,
        trailerKey: trailer.results[trailer.results.length - 1].key,
        movieActors: people.cast,
        movieId: id,
        movieCollection: details?.belongs_to_collection,
        reviews: reviews.results,
      };
    } catch (error) {
      console.error(error)
    }
  }
);

const fetchSuggested = createAsyncThunk(
  'movies/FETCH_SUGGESTED',
  async (detailsObj, thunkAPI) => {
    try {
      const movies = await fetch(
        `https://api.themoviedb.org/3/movie/${detailsObj.id}/similar?language=en-US&page=1`,
        {
          signal: thunkAPI.signal,
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ID_AUTHORIZATION}`,
          }
        }
      );
      const data = await movies.json();

      // set NoSuggested Movies when suggested movie is not implemented on database
      if (data.results.length < 1) {
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
      state.trailerKey = action.payload.trailerKey;
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
