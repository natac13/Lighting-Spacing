import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup'

import Display from '../Display';
import FormDisplay from './FormDisplay';


function horizontalDistanceCal(lengthOfRoom, lightsPerRow) {
  const horizontalDistanceBetweenLightCenters = lengthOfRoom / lightsPerRow;
  const horizontalDistanceBetweenWallAndFirstLightCenter = horizontalDistanceBetweenLightCenters / 2;
  return {
    horizontalDistanceBetweenLightCenters,
    horizontalDistanceBetweenWallAndFirstLightCenter,
  }
}

function veritcalDistanceCal(widthOfRoom, numOfRows) {
  const verticalDistanceBetweenLightCenters = widthOfRoom / numOfRows;
  const verticalDistanceBetweenWallAndFirstLightCenter = verticalDistanceBetweenLightCenters / 2;
  return {
    verticalDistanceBetweenLightCenters,
    verticalDistanceBetweenWallAndFirstLightCenter
  }
}

class LightSpacingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        numOfLights: 4,
        numOfRows: 1,
        lightsPerRow: 4,
        lengthOfRoom: 50,
        widthOfRoom: 20,
        orientation: 'parallel',
        units: 'imperial',
        multiRows: false,
      },
      answers: {
        // distanceBetweenLightCenters: undefined,
        // distanceBetweenWallAndFirstLightCenter: undefined,
        // distanceFromWidthWallToLightCenter: undefined,
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, actions) {
    const {
      numOfLights,
      lengthOfRoom,
      widthOfRoom,
      orientation,
      units,
      multiRows,
      numOfRows,
      lightsPerRow,
    } = values;

    const isParallel = orientation === 'parallel';
    // Horizontal distance calculation
    const {
      horizontalDistanceBetweenLightCenters,
      horizontalDistanceBetweenWallAndFirstLightCenter
    } = horizontalDistanceCal(lengthOfRoom, lightsPerRow);


    // Vertical distance calculations
    const {
      verticalDistanceBetweenLightCenters,
      verticalDistanceBetweenWallAndFirstLightCenter,
    } = veritcalDistanceCal(widthOfRoom, numOfRows);


    const newAnswers = {
      horizontalDistanceBetweenLightCenters,
      horizontalDistanceBetweenWallAndFirstLightCenter,
      verticalDistanceBetweenLightCenters,
      verticalDistanceBetweenWallAndFirstLightCenter,
    };

    setTimeout(() => {
      console.log(JSON.stringify(newAnswers, null, 2));
      this.setState(prevState => ({
        ...prevState,
        formValues: values,
        answers: newAnswers,
      }));
      actions.setSubmitting(false);
    }, 1000);
  }

  render() {
    const { formValues, answers } = this.state;
    const maxLightPerRow = 12;
    return (
      <div>
        <Formik
          initialValues={formValues}
          onSubmit={this.handleSubmit}
          validationSchema={yup.object({
            numOfLights: yup.number().min(1).positive('Positive value needed').required('Required'),
            lengthOfRoom: yup.number().required('Required'),
            widthOfRoom: yup.number(),
            lightsPerRow: yup.number().min(1).lessThan(maxLightPerRow, `Max ${maxLightPerRow} lights per Row.`),
            numOfRows: yup.number().min(1),
            orientation: yup.string().matches(/parallel|series/).required('Required'),
            units: yup.string().matches(/imperial|metric/).required('Required'),
          })}
          render={props => (
            <React.Fragment>
              <FormDisplay {...props} {...answers} />
              <Display {...props.values} {...answers} />
            </React.Fragment>
          )}
        />
      </div>
    );
  }
}

export default LightSpacingForm;
