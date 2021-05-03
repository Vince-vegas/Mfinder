import React from 'react';
import Button from '../buttons/Button';
import PropTypes from 'prop-types';
import '../../Styles/pagination.scss';
import { genPaginationArray } from '../../Utils/genPaginationArray';

const PagePagination = ({ totalPagination, currentPage, handleClick }) => {
  return (
    <div className="pagination">
      <ul className="pgn-menu">
        {genPaginationArray(totalPagination).map((id) => {
          return (
            <li key={id} className="pgn-list">
              <Button
                className={
                  currentPage === id ? 'pgn-link pgn-link--active' : 'pgn-link'
                }
                onClick={handleClick.bind(this, id)}
              >
                {id}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

PagePagination.propTypes = {
  totalPagination: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default PagePagination;
