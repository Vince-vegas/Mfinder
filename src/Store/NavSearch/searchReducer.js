import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchSearchedMovie = createAsyncThunk(
  'movie-search/FETCH_SEARCH',
  async (movie, thunkAPI) => {
    try {
      const getSearchMovie = await fetch(
        `https://api.themoviedb.org/3/search/movie?language=en-US&query=${movie.title}&page=${movie.page}&include_adult=false
    `,
        {
          signal: thunkAPI.signal,
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ID_AUTHORIZATION}`,
          }
        }
      );

      const searchedData = await getSearchMovie.json();

      // return empty array when no movie data
      // tmdb api return an error object when no search query
      if (searchedData.hasOwnProperty('errors')) {
        return {
          movie: {
            results: [],
          },
        };
      }

      return {
        movie: searchedData,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
);

const searchSlice = createSlice({
  name: 'search-movie',
  initialState: {
    isLoading: false,
    searchedValue: '',
    searchedMovie: [],
    first_list: 1,
    current_page: 1,
    totalPage: null,
    total_list_displayed: 4,
    TMDB_MAX_PAGINATION: 500,
  },
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.searchedValue = '';
      state.searchedMovie = [];
      state.totalPage = null;
      state.current_page = 1;
    },
    setSearchValue: (state, action) => {
      state.searchedValue = action.payload.name;
    },
  },

  extraReducers: {
    [fetchSearchedMovie.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSearchedMovie.rejected]: (state) => {
      state.isLoading = false;
    },
    [fetchSearchedMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.searchedMovie = action.payload.movie.results;
      state.totalPage = action.payload.movie.total_pages > state.TMDB_MAX_PAGINATION ? state.TMDB_MAX_PAGINATION : action.payload.movie.total_pages;
      state.current_page = action.payload.movie.page;
    },
  },
});

const { resetState, setSearchValue } = searchSlice.actions;

// reset the state
const onResetState = () => resetState();

// set a searched value to the state
const onSetSearch = (name) => setSearchValue({ name });

export { fetchSearchedMovie, onResetState, onSetSearch };
export default searchSlice.reducer;
