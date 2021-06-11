import React from 'react';
import SuggestError from './SuggestError';
import ContentSpinner from './ContentSpinner';
import CollectSuggested from '../Collect-Movie/CollectSuggested';

const SuggestedMovies = ({ suggestMovies, isSuggestLoad, noSuggested }) => {
  return (
    <>
      <div className='mn-suggested'>
        <div className='container'>
          <div className='suggest-title'>
            <h1>Suggested Movies</h1>
          </div>
          <div className='row justify-between suggested-row'>
            {/* Show Spinner when fetching suggested movies */}
            {isSuggestLoad && <ContentSpinner />}

            <CollectSuggested movieArray={suggestMovies} />

            {/* Show Text when no suggested movies */}
            {noSuggested && <SuggestError />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestedMovies;
