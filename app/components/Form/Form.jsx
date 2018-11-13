import React, { Component } from 'react';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
} from 'formik';
import {
  FormGroup,
  Radio,
  ButtonToolbar,
  Button,
  HelpBlock,
} from 'react-bootstrap';
import * as yup from 'yup'

import Display from '../Display';
import FieldGroup from '../FieldGroup';

import style from './style.scss';

class LightSpacingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        numOfLights: 4,
        // numOfRows: undefined,
        // lightsPerRow: undefined,
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

  render() {
    const { formValues, answers } = this.state;
    return (
      <div>
        <Display {...formValues} {...answers} />
        <Formik
          initialValues={formValues}
          onSubmit={(values, actions) => {
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
          }}
          validationSchema={yup.object({
            numOfLights: yup.number().required('Required'),
            lengthOfRoom: yup.number().required('Required'),
            widthOfRoom: yup.number(),
            lengthOfLight: yup.number(),
            widthOfLight: yup.number(),
            orientation: yup.string().matches(/parallel|series/).required('Required'),
            units: yup.string().matches(/imperial|metric/).required('Required'),
          })}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            isSubmitting,
            touched,
            dirty,
          }) => (
            <Form>
              <React.Fragment>
                <Field name="units">
                  {({ field }) => (
                    <FormGroup>
                      <Radio {...field} value="imperial" checked={field.value === 'imperial'} inline>
                        Imperial (inches)
                      </Radio>
                      <Radio {...field} value="metric" checked={field.value === 'metric'} inline>
                        Metric (millimeters)
                      </Radio>
                    </FormGroup>
                  )}
                </Field>
                <ErrorMessage name="units">
                  {msg => <HelpBlock>{msg}</HelpBlock>}
                </ErrorMessage>
              </React.Fragment>

              <React.Fragment>
                <Field name="numOfLights">
                  {({ field, form }) => {
                    console.log(field, form);
                    return (
                      <FieldGroup
                        {...field}
                        onChange={(x) => {
                          handleChange(x);
                          this.visualUpdateNumOfLights(x);
                        }}
                        type="number"
                        label="Number Of Lights"
                      />);
                  }}
                </Field>
                <ErrorMessage name="numOfLights">
                  {msg => <HelpBlock>{msg}</HelpBlock>}
                </ErrorMessage>
              </React.Fragment>

              <React.Fragment>
                <Field name="lengthOfLight">
                  {({ field, form }) => (
                    <FieldGroup {...field} type="number" label="Length Of Light" help={<ErrorMessage name="lengthOfLight" />} />
                  )}
                </Field>
                <ErrorMessage name="lengthOfRoom">
                  {msg => <HelpBlock>{msg}</HelpBlock>}
                </ErrorMessage>
              </React.Fragment>

              <Field name="widthOfLight">
                {({ field, form }) => (
                  <FieldGroup {...field} type="number" label="Width Of Light" />
                )}
              </Field>

              <Field name="lengthOfRoom">
                {({ field, form }) => (
                  <FieldGroup {...field} type="number" label="Length Of Room" />
                )}
              </Field>

              <Field name="widthOfRoom">
                {({ field, form }) => (
                  <FieldGroup {...field} type="number" label="Width Of Room" />
                )}
              </Field>

              <Field name="orientation">
                {({ field, form }) => (
                  <FormGroup>
                    <Radio
                      {...field}
                      value="parallel"
                      checked={field.value === 'parallel'}
                      inline
                      onChange={(x) => {
                        handleChange(x);
                        this.visualUpdateOrientation(x);
                      }}
                    >
                      Parallel
                    </Radio>
                    <Radio
                      {...field}
                      value="series"
                      checked={field.value === 'row'}
                      inline
                      onChange={(x) => {
                        handleChange(x);
                        this.visualUpdateOrientation(x);
                      }}
                    >
                      Row / Series
                    </Radio>
                  </FormGroup>
                )}
              </Field>

              <ButtonToolbar>
                <Button
                  type="submit"
                  bsStyle="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
                <Button
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  Reset
                </Button>
              </ButtonToolbar>

            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default LightSpacingForm;
