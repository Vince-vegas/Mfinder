import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Logo';
import MenuIcon from '../Assets/SvgIcon/MenuIcon';
import { toggleShowMenus } from '../Store/NavHandler/navHandlerReducer';
import '../Styles/navbar.scss';
import Menus from './Menus';
import NavSearch from './NavSearch';

const Navbar = () => {
  const dispatch = useDispatch();

  const onShowOpts = () => {
    dispatch(toggleShowMenus());
  };

  return (
    <div className='nav-header'>
      <div className='nav-holder'>
        <div className='nav-container'>
          {/* TOGGLE MENU ICON */}
          <button
            style={{ background: 'transparent' }}
            className='toggle-menu'
            onClick={onShowOpts}
          >
            <MenuIcon className='toggle-svg' />
          </button>

          {/* LOGO COM */}
          <div className='logo-box'>
            <Link to='/' className='logo'>
              <Logo />
            </Link>
          </div>

          {/* MENUS */}
          <Menus />

          {/* Search Movie  */}
          <NavSearch />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
