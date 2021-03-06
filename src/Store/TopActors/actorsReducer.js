import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchTopActors = createAsyncThunk(
  'actors/FETCH_ACTORS',
  async (page, thunkAPI) => {
    try {
      const getActors = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_ID}&language=en-US&page=${page}`,
        { signal: thunkAPI.signal }
      );

      const actorsData = await getActors.json();

      // Scroll to Top when Pagination clicked
      window.scrollTo(0, 0);
      return actorsData;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const actorSlice = createSlice({
  name: 'actors',
  initialState: {
    isLoading: false,
    actors: [],
    page: 1,
    totalPage: 5,
    error: {},
  },
  reducers: {
    SET_PAGE: (state, action) => {
      state.page = action.payload.page;
    },
    resetState: (state) => {
      state.isLoading = false;
      state.actors = [];
      state.page = 1;
      state.error = {};
    },
  },
  extraReducers: {
    [fetchTopActors.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchTopActors.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [fetchTopActors.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.actors = action.payload.results;
    },
  },
});

const { SET_PAGE, resetState } = actorSlice.actions;

const onSetPage = (page) => SET_PAGE({ page });
const onResetState = () => resetState();

export { onResetState, onSetPage, fetchTopActors };
export default actorSlice.reducer;
