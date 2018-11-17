import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup'

import Display from '../Display';
import FormDisplay from './FormDisplay';

import style from './style.scss';

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
        widthOfLight: 1,
        lengthOfLight: 4,
        orientation: 'parallel',
        units: 'imperial',
      },
      answers: {
        // distanceBetweenLightCenters: undefined,
        // distanceBetweenWallAndFirstLightCenter: undefined,
        // distanceBetweenLightsEdgeToEdge: undefined,
        // distanceBetweenWallAndFirstLightEdge: undefined,
        // distanceFromWidthWallToLightCenter: undefined,
        // distanceFromWidthWallToLightEdge: undefined,
      },
    };

    this.visualUpdateNumOfLights = this.visualUpdateNumOfLights.bind(this);
    this.visualUpdateOrientation = this.visualUpdateOrientation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  visualUpdateNumOfLights(event) {
    const { target: { value } } = event;
    const newNumOfLights = value < 0 ? 0 : value;
    return this.setState(prevState => ({
      ...prevState,
      answers: {},
      formValues: { ...prevState.formValues, numOfLights: newNumOfLights },
    }));
  }

  visualUpdateOrientation(event) {
    const { target: { value } } = event;
    return this.setState(prevState => ({
      ...prevState,
      formValues: { ...prevState.formValues, orientation: value },
    }));
  }

  handleSubmit(values, actions) {
    const {
      numOfLights,
      lengthOfRoom,
      widthOfRoom,
      lengthOfLight,
      widthOfLight,
      orientation,
      units,
    } = values;
    const isParallel = orientation === 'parallel';
    const lightOccupyingSpace = (isParallel ? widthOfLight : lengthOfLight) * numOfLights;
    const freeSpace = lengthOfRoom - lightOccupyingSpace;
    const distanceBetweenLightCenters = lengthOfRoom / numOfLights;
    const distanceBetweenWallAndFirstLightCenter = distanceBetweenLightCenters / 2;
    const distanceBetweenLightsEdgeToEdge = freeSpace / numOfLights;
    const distanceBetweenWallAndFirstLightEdge = distanceBetweenLightsEdgeToEdge / 2;
    const distanceFromWidthWallToLightCenter = widthOfRoom / 2;
    const distanceFromWidthWallToLightEdge = (widthOfRoom - (isParallel ? lengthOfLight : widthOfLight)) / 2;

    const newAnswers = {
      distanceBetweenLightCenters,
      distanceBetweenWallAndFirstLightCenter,
      distanceBetweenLightsEdgeToEdge,
      distanceBetweenWallAndFirstLightEdge,
      distanceFromWidthWallToLightCenter,
      distanceFromWidthWallToLightEdge,
    };

    setTimeout(() => {
      console.log(JSON.stringify(newAnswers, null, 2));
      this.setState(prevState => ({
        ...prevState,
        formValues: values,
        answers: newAnswers,
      }));
      actions.setSubmitting(false);
      console.log(this.state)
    }, 1000);
  }

  render() {
    const { formValues, answers } = this.state;
    return (
      <div>
        <Display {...formValues} {...answers} />
        <Formik
          initialValues={formValues}
          onSubmit={this.handleSubmit}
          validationSchema={yup.object({
            numOfLights: yup.number().required('Required'),
            lengthOfRoom: yup.number().required('Required'),
            widthOfRoom: yup.number(),
            lengthOfLight: yup.number(),
            widthOfLight: yup.number(),
            orientation: yup.string().matches(/parallel|series/).required('Required'),
            units: yup.string().matches(/imperial|metric/).required('Required'),
          })}
          render={props => (
            <FormDisplay
              visualUpdateNumOfLights={this.visualUpdateNumOfLights}
              visualUpdateOrientation={this.visualUpdateOrientation}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default LightSpacingForm;
