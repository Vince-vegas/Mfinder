import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ExitIcon from '../Assets/SvgIcon/ExitIcon';
import SearchIcon from '../Assets/SvgIcon/SearchIcon';
import {
  resetNavHandler,
  toggleMobileSearch,
} from '../Store/NavHandler/navHandlerReducer';
import { onSetSearch } from '../Store/NavSearch/searchReducer';

// SEARCH BOX FOR MOBILE SCREEN
const NavSearchMobile = () => {
  let history = useHistory();
  const { showMobileSearch } = useSelector((state) => state.navHandlers);

  const dispatch = useDispatch();

  const onCloseMobileSearch = () => {
    dispatch(toggleMobileSearch());
  };

  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();

    dispatch(onSetSearch(searchVal));
    history.push(`/search?q=${searchVal}`);

    // reset nav handler state
    dispatch(resetNavHandler());
    // reset search input state
    setSearchVal('');
  };

  return (
    <div
      className={
        showMobileSearch ? 'search-expand show-search' : 'search-expand'
      }
    >
      <form className='search-form' onSubmit={onSubmitSearch}>
        <button type='submit' className='icon-box'>
          <SearchIcon />
        </button>

        {/* Mobile Search Input */}
        <div className='search-input'>
          <input
            name='name'
            type='text'
            placeholder='Search movies....'
            autoComplete='off'
            className='lg-input'
            value={searchVal}
            onChange={handleSearch}
          />
        </div>

        <div className='icon-box' onClick={onCloseMobileSearch}>
          <ExitIcon className='ex-icon' />
        </div>
      </form>
    </div>
  );
};

export default NavSearchMobile;
