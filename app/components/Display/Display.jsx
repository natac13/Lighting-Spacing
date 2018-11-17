import React from 'react';

import Light from 'Components/Light';

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


  const lights = range(numOfLights).map((e, i) => (
    <Light orientation={orientation} key={`#${i + 1}`} />));
  // const a = renderMesurment(distanceBetweenLightCenters);
  // const b = renderMesurment(distanceBetweenWallAndFirstLightCenter);

  // const toDisplay = flatten(lights.map((light, i) => {
  //   if (i === 0) {
  //     return [<span key={`${i}b`}>{b}</span>, light];
  //   }
  //   if (i + 1 === lights.length) {
  //     return [<span key={`a${i}`}>{a}</span>, light, <span key={`${i}b`}>{b}</span>];
  //   }
  //   return [<span key={`${i}a`}>{a}</span>, light];
  // }));
  const roomWidth = orientation === 'parallel' ? 12 * numOfLights : 23 * numOfLights;
  const gridTemplateColumns = `repeat(${numOfLights}, 2em)`;
  const roomStyling = {
    'width': `${roomWidth}em`,
    'gridTemplateColumns': gridTemplateColumns,
  };
  return (
    <div className={style.container}>
      <div className={style.room} style={roomStyling}>
        {lights}
      </div>
    </div>
  );
}

export default Display;
