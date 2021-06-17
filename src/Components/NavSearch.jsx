import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchIcon from '../Assets/SvgIcon/SearchIcon';
import { toggleMobileSearch } from '../Store/NavHandler/navHandlerReducer';
import { onSetSearch } from '../Store/NavSearch/searchReducer';

const NavSearch = () => {
  // =======================
  let history = useHistory();
  const [searchVal, setSearchVal] = useState('');

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();

    if (searchVal.length > 0) {
      dispatch(onSetSearch(searchVal));
      // route /search
      history.push(`/search?q=${searchVal}`);
      setSearchVal('');
    }
  };

  const onShowMobileSearch = () => {
    dispatch(toggleMobileSearch());
  };
  // ==================================

  return (
    <Fragment>
      <div className='nav-search'>
        <form className='search-form' onSubmit={onSubmitSearch}>
          <div className='search-input'>
            <input
              name='name'
              type='text'
              placeholder='Search movies....'
              autoComplete='off'
              className='sm-input'
              value={searchVal}
              onChange={handleSearch}
            />
          </div>
          <button type='submit'>
            <SearchIcon />
          </button>
        </form>
      </div>

      {/* NAV SEARCH ON MOBILE */}
      <div className='toggle-search toggle-menu' onClick={onShowMobileSearch}>
        <SearchIcon />
      </div>
    </Fragment>
  );
};

export default NavSearch;
