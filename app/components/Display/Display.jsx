import React from 'react';

import range from 'lodash/range';
import flatten from 'lodash/flatten';


import style from './style.scss';

function Display({
  lengthOfRoom,
  widthOfRoom,
  numOfLights,
  units,
  orientation,
  distanceBetweenWallAndFirstLightCenter,
  distanceBetweenLightCenters,
}) {

  const renderMesurment = (distance) => {
    if (!distance) { return ''; }
    if (units === 'metric') {
      return `${distance}mm`;
    }
    return `${distance}"`;
  };

  const lightsParallel = {
    width: '2em',
    height: '10em',
  };

  const lightsSeries = {
    width: '10em',
    height: '2em',
  };

  const lights = range(numOfLights).map(
    (e, i) => <div key={`#${i + 1}`} className={style.light} style={orientation === 'parallel' ? lightsParallel : lightsSeries} />,
  );
  const a = renderMesurment(distanceBetweenLightCenters);
  const b = renderMesurment(distanceBetweenWallAndFirstLightCenter);

  const toDisplay = flatten(lights.map((light, i) => {
    if (i === 0) {
      return [<span key={`${i}b`}>{b}</span>, light];
    }
    if (i + 1 === lights.length) {
      return [<span key={`${i}a`}>{a}</span>, light, <span key={`${i}b`}>{b}</span>];
    }
    return [<span key={`${i}a`}>{a}</span>, light];
  }));
  const roomWidth = orientation === 'parallel' ? 10 * numOfLights : 40 * numOfLights;
  return (
    <div className={style.container}>
    Display
      <div className={style.room} style={{ width: `${roomWidth}em` }}>
        {toDisplay}
      </div>
    </div>
  );
}

export default Display;
