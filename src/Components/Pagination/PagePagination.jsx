import '../../Styles/pagination.scss';
import { genPaginationArray } from '../../Utils/genPaginationArray';
import { useDispatch } from 'react-redux';
import { genPaginationRange } from '../../Utils/genPaginationRange';

const PagePagination = ({ current_page, totalPage, total_list_displayed, first_list, onSetPage, onPreviousPage, onNextPage }) => {
  const dispatch = useDispatch()
  const { start, end } = genPaginationRange(current_page, totalPage, total_list_displayed)

  const handleSetPage = (id) => {
    dispatch(onSetPage(id));
  };

  const handleBackPage = () => {
    dispatch(onPreviousPage())
  }

  const handleNextPage = () => {
    dispatch(onNextPage())
  }

  return (
    <div className='pagination'>
      <ul className='pgn-menu'>
        <li className='pgn-list pgn-list-handler'>
          <button className='pgn-link previous-next-btn' disabled={current_page === first_list} onClick={handleBackPage}>
          <span className='icon-left'>
            <svg height={24} width={24} data-slot="icon" fill="none" strokeWidth="3.00" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
            </svg>
          </span>
          <span className='text'>Previous</span>
          </button>
        </li>
        <li className='pgn-list'>
          <button
            className={
              current_page === first_list ? 'pgn-link pgn-link--active' : 'pgn-link'
            }
            onClick={handleSetPage.bind(this, first_list)}
            disabled={current_page === first_list}
            >
            {first_list}
          </button>
        </li>

        {start > (first_list + 1) && (
          <li className="pgn-list" style={{ pointerEvents: "none"}}>
            <span className="pgn-link">...</span>
          </li>
        )}

        {genPaginationArray(start, end).map((id) => {
          return (
            <li key={id} className='pgn-list'>
              <button
                className={
                  current_page === id ? 'pgn-link pgn-link--active' : 'pgn-link'
                }
                onClick={handleSetPage.bind(this, id)}
                disabled={current_page === id}
              >
                {id}
              </button>
            </li>
          );
        })}

        {end < (totalPage - 1) && (
          <li className="pgn-list">
            <span className="pgn-link" style={{ pointerEvents: "none"}}>...</span>
          </li>
        )}

        <li className='pgn-list'>
          <button
            className={
              current_page === totalPage ? 'pgn-link pgn-link--active' : 'pgn-link'
            }
            onClick={handleSetPage.bind(this, totalPage)}
            disabled={current_page === totalPage}
            >
            {totalPage}
          </button>
        </li>
        <li className='pgn-list pgn-list-handler'>
          <button className='pgn-link previous-next-btn' disabled={current_page === totalPage} onClick={handleNextPage}><span className='text'>Next</span>
            <span className='icon-right'>
              <svg height={24} width={24} data-slot="icon" fill="none" strokeWidth="3.00" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
              </svg>
          </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PagePagination;
