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
      />
    </section>
  )
}

export default Light;
