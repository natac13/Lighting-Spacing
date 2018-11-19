import React from 'react';

import Light from 'Components/Light';

import range from 'lodash/range';
import flatten from 'lodash/flatten';
import { min } from 'ramda';


import style from './style.scss';

function Display({
  lengthOfRoom,
  widthOfRoom,
  numOfLights,
  units,
  orientation,
  horizontalDistanceBetweenLightCenters,
  horizontalDistanceBetweenWallAndFirstLightCenter,
  verticalDistanceBetweenLightCenters,
  verticalDistanceBetweenWallAndFirstLightCenter,
  lightsPerRow,
  numOfRows,
  multiRows,
}) {

  // const renderMesurment = (distance) => {
  //   if (!distance) { return ''; }
  //   if (units === 'metric') {
  //     return `${distance}mm`;
  //   }
  //   return `${distance}"`;
  // };
  //
  //
  // const a = renderMesurment(horizontalDistanceBetweenLightCenters);
  // const b = renderMesurment(horizontalDistanceBetweenWallAndFirstLightCenter);
  // const c = renderMesurment(verticalDistanceBetweenLightCenters);
  // const d = renderMesurment(verticalDistanceBetweenWallAndFirstLightCenter);

  const lights = range(numOfLights).map((e, i) => (
    <Light
      key={`#${i + 1}`}
      index={i}
      orientation={orientation}
      numOfRows={numOfRows}
    />));

  const colCount = multiRows ? min(lightsPerRow, numOfLights) : numOfLights;
  const roomWidth = orientation === 'parallel' ? 9 * colCount : 16 * colCount;
  const gridTemplateColumns = `repeat(${colCount}, 2em)`;
  const roomStyling = {
    width: `${roomWidth}em`,
    gridTemplateColumns,
  };
  return (
    <div className={style.container}>
      <h3 className={style.widthLabel}>Width</h3>
      <h3 className={style.lengthLabel}>Length</h3>
      <div className={style.room} style={roomStyling}>

        {lights}
      </div>
    </div>
  );
}

export default Display;
