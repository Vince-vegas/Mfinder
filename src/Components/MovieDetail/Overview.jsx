/* eslint-disable array-callback-return */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import YoutubeIcon from '../../Assets/SvgIcon/YoutubeIcon';
import YoutubeModal from '../Modal/YoutubeModal';
import SubText from './SubText';
import ContentSpinner from './ContentSpinner';
import LinkIcon from '../../Assets/SvgIcon/LinkIcon';

const Overview = (props) => {
  const { trailerKey, movieActors, onWatchTrailer, isPlayTrailer } = props;
  const {
    poster_path,
    title,
    overview,
    genres,
    original_language,
    runtime,
    release_date,
    vote_average,
    homepage,
  } = props.movieDetails;

  return (
    <Fragment>
      <div className='details'>
        {!overview && <ContentSpinner />}

        {/* Show Movie Details when overview is fetched */}
        {overview && (
          <div className='row justify-between info-row'>
            <div className='col-lg-2 col-md-3 img-info'>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                  alt={title}
                />
              </div>
            </div>
            {/*  */}
            <div className='col-lg-7 col-md-6'>
              <div className='content-info'>
                <h2 className='info-title'>{title}</h2>
                <p className='overview mb20'>{overview}</p>
                <div className='other-info'>
                  <div className='row'>
                    <div className='col-md-7'>
                      {genres && (
                        <SubText
                          subTitle='Genre'
                          subText={genres.map((item) => (
                            <span className='selection' key={item.id}>
                              {item.name}
                            </span>
                          ))}
                        />
                      )}
                      {movieActors && (
                        <SubText
                          subTitle='Starring'
                          subText={movieActors.slice(0, 5).map((item) => {
                            return (
                              <Link
                                to={`/actor/movies/${item.id}`}
                                className='selection starring'
                                key={item.id}
                              >
                                {item.name}
                              </Link>
                            );
                          })}
                        />
                      )}

                      <SubText
                        subTitle='Language'
                        subText={original_language}
                      />
                    </div>
                    <div className='col-md-5'>
                      <SubText subTitle='Duration' subText={`${runtime}mins`} />
                      <SubText subTitle='Release' subText={release_date} />
                      <SubText subTitle='Rating' subText={Number(vote_average).toFixed(1)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className='w-100 col-lg-3 col-md-2'>
              <div className='info-buttons'>
                <button className='btn info-link' onClick={onWatchTrailer}>
                  <YoutubeIcon />
                  <span className='text-link'>
                    {trailerKey !== undefined
                      ? 'Watch Trailer'
                      : 'No Trailer Yet'}
                  </span>
                </button>

                <a
                  rel='noreferrer'
                  target='_blank'
                  href={homepage}
                  className='btn info-link btn-site'
                >
                  <LinkIcon /> <span className='text-link'>Visit Site</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* YOUTUBE MODAL */}
      {isPlayTrailer && (
        <YoutubeModal onPlayTrailer={onWatchTrailer} trailerKey={trailerKey} />
      )}
    </Fragment>
  );
};

export default Overview;
