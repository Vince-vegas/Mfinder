import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchTopActors = createAsyncThunk(
  'actors/FETCH_ACTORS',
  async (page, thunkAPI) => {
    try {
      const getActors = await fetch(
        `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`,
        { 
          signal: thunkAPI.signal,
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ID_AUTHORIZATION}`,
          }
        }
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
    first_list: 1,
    totalPage: null,
    total_list_displayed: 4,
    TMDB_MAX_PAGINATION: 500,
    error: {},
  },
  reducers: {
    PREVIOUS_PAGE: (state) => {
      state.page = state.page - 1
    },
    NEXT_PAGE: (state) => {
      state.page = state.page + 1
    },
    SET_PAGE: (state, action) => {
      state.page = action.payload.page;
    },
    resetState: (state) => {
      state.isLoading = false;
      state.actors = [];
      state.page = 1;
      state.totalPage = null;
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
      state.totalPage = action.payload.total_pages > state.TMDB_MAX_PAGINATION ? state.TMDB_MAX_PAGINATION : action.payload.total_pages;
    },
  },
});

const { SET_PAGE, PREVIOUS_PAGE, NEXT_PAGE, resetState } = actorSlice.actions;

const onSetPage = (page) => SET_PAGE({ page });
const onResetState = () => resetState();

const onPreviousPage = () => PREVIOUS_PAGE()
const onNextPage = () => NEXT_PAGE()

export { onResetState, onSetPage, onPreviousPage, onNextPage, fetchTopActors };
export default actorSlice.reducer;
