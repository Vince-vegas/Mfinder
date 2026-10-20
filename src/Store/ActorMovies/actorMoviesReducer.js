import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../Utils/fetchData';

const fetchActorMovies = createAsyncThunk(
  'actorMovies/FETCH_MOVIES',
  async (collectionId, thunkAPI) => {
    try {
      const [movies, actor] = await Promise.all([
        fetchData(`https://api.themoviedb.org/3/person/${collectionId}/movie_credits?language=en-US`, thunkAPI),
        fetchData(`https://api.themoviedb.org/3/person/${collectionId}?language=en-US`, thunkAPI)
      ])

      return {
        movies: movies.cast,
        actorDetails: actor,
      };
    } catch (error) {
      console.error(error);
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
