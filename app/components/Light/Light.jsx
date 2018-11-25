import React from 'react';
import PropTypes from 'prop-types';

import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowDown,
  FiArrowUp,
} from 'react-icons/fi';

import style from './style.scss';

const Light = (props) => {
  const {
    orientation,
    index,
    numOfRows,
  } = props

  const lightsParallel = {
    width: '2em',
    height: '10em',
  };

  const lightsSeries = {
    width: '10em',
    height: '2em',
  };

  const aLetterParallel = {
    left: '3em',
    top: '50%',
    transform: 'translate(50%, -50%)',
  };

  const bLetterParallel = {
    left: '-2em',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const cLetterParallel = {
    left: '-5%',
    top: '-25%',
    transform: 'translate(50%, -50%)',
  };

  const dLetterParallel = {
    left: '-5%',
    top: '120%',
    transform: 'translate(50%, 0%)',
  };

  const aLetterSeries = {
    left: '130%',
    top: '10%',
    transform: 'translate(-50%, 0%)',
  };

  const bLetterSeries = {
    left: '-25%',
    top: '10%',
    transform: 'translate(-50%, 0%)',
  };

  const cLetterSeries = {
    left: '50%',
    top: '-100%',
    transform: 'translate(-50%, -100%)',
  };

  const dLetterSeries = {
    left: '50%',
    top: '100%',
    transform: 'translate(-50%, 120%)',
  };

  const aLetterOrientation = orientation === 'parallel' ? aLetterParallel : aLetterSeries;
  const bLetterOrientation = orientation === 'parallel' ? bLetterParallel : bLetterSeries;
  const cLetterOrientation = orientation === 'parallel' ? cLetterParallel : cLetterSeries;
  const dLetterOrientation = orientation === 'parallel' ? dLetterParallel : dLetterSeries;

  return (
    <section className={style.container}>
      <FiArrowUp className={style.arrowUp} />
      <FiArrowDown className={style.arrowDown} />
      <FiArrowLeft className={style.arrowLeft} />
      <FiArrowRight className={style.arrowRight} />

      <div
        className={style.light}
        style={orientation === 'parallel' ? lightsParallel : lightsSeries}
      >
        {index === 0 && (
          <React.Fragment>
            <p className={style.aMeasurment} style={aLetterOrientation}>A</p>
            <p className={style.bMeasurment} style={bLetterOrientation}>B</p>
            <p className={style.cMeasurment} style={cLetterOrientation}>C</p>
            {numOfRows > 1 && <p className={style.dMeasurment} style={dLetterOrientation}>D</p>}
          </React.Fragment>
        )
        }
      </div>
    </section>
  )
}

export default Light;
