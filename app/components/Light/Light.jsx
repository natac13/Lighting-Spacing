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
            <p className={style.aMeasurment}>A</p>
            <p className={style.bMeasurment}>B</p>
            <p className={style.cMeasurment}>C</p>
            {numOfRows > 1 && <p className={style.dMeasurment}>D</p>}
          </React.Fragment>
        )
        }
      </div>
    </section>
  )
}

export default Light;
