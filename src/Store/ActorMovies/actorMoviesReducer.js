import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchActorMovies = createAsyncThunk(
  'actorMovies/FETCH_MOVIES',
  async (collectionId, thunkAPI) => {
    try {
      const onFetchMovies = await fetch(
        `https://api.themoviedb.org/3/person/${collectionId}/movie_credits?language=en-US`,
        { 
          signal: thunkAPI.signal,
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ID_AUTHORIZATION}`,
          }
         }
      );
      const moviesData = await onFetchMovies.json();

      const onFetchActorDetail = await fetch(
        `https://api.themoviedb.org/3/person/${collectionId}?api_key=${process.env.REACT_APP_TMDB_ID}&language=en-US`,
        { 
          signal: thunkAPI.signal,
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ID_AUTHORIZATION}`,
          }
         }
      );
      const actorDetailData = await onFetchActorDetail.json();

      return {
        movies: moviesData.cast,
        actorDetails: actorDetailData,
      };
    } catch (error) {
      console.log(error);
      throw new Error('error fetching', error);
    }
  }
);

const actorMoviesSlice = createSlice({
  name: 'actorMovies',
  initialState: {
    isLoading: false,
    movies: [],
    slicedMovies: [],
    actorDetail: {},
    page: 1,
    error: {},
  },
  reducers: {
    COLLECT_MOVIES: (state, action) => {
      state.slicedMovies = action.payload.collected;
      state.page = action.payload.page;
    },
    resetState: (state) => {
      state.isLoading = false;
      state.movies = [];
      state.slicedMovies = [];
      state.actorDetail = {};
      state.page = 1;
      state.error = {};
    },
  },
  extraReducers: {
    [fetchActorMovies.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchActorMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload.movies;
      state.actorDetail = action.payload.actorDetails;
    },
    [fetchActorMovies.rejected]: (state, action) => {
      state.error = '404';
    },
  },
});

const { COLLECT_MOVIES, resetState } = actorMoviesSlice.actions;

export { fetchActorMovies, resetState, COLLECT_MOVIES };
export default actorMoviesSlice.reducer;
