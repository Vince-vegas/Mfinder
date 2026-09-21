import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { onCloseMenus } from '../Store/NavHandler/navHandlerReducer';

import GenresList from './GenresList';

const Menus = () => {
  const { genres, showMenus } = useSelector((state) => state.navHandlers);
  const dispatch = useDispatch();

  const handleCloseMenus = () => {
    dispatch(onCloseMenus());
  };

  return (
    <div className={showMenus ? 'nav-center opts-block' : 'nav-center'}>
      <div className='nav-menu'>
        <li className='nav-list'>
          <Link className='nav-link' to='/' onClick={handleCloseMenus}>
            Home
          </Link>
        </li>
        <li className='nav-list'>
          <Link className='nav-link' to='/discover' onClick={handleCloseMenus}>
            Discover
          </Link>
        </li>
        <GenresList genres={genres} />
        <li className='nav-list'>
          <Link className='nav-link' to='/actors' onClick={handleCloseMenus}>
            People
          </Link>
        </li>
      </div>
    </div>
  );
};

export default Menus;
