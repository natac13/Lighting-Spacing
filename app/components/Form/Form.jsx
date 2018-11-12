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
  ControlLabel,
  FormControl,
  HelpBlock,
  ButtonToolbar,
  Button,
} from 'react-bootstrap';
import range from 'lodash/range';

import style from './style.scss';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

function Display({ lengthOfRoom, widthOfRoom, numOfLights }) {
  // let lights = [];
  // for (let n = 0; n < numOfLights; n++) {
  //   lights = lights.concat([<div className={style.light} />]);
  // }
  const lights = range(numOfLights).map((e, i) => <div key={`#${i+1}`} className={style.light} />);
  return (
    <div className={style.container}>
    Display
      <div className={style.room}>
        {lights}
      </div>
    </div>
  );
}

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
      },
      answers: {
        distanceBetweenLightCenters: undefined,
        distanceBetweenWallAndFirstLightCenter: undefined,
        distanceBetweenLightsEdgeToEdge: undefined,
        distanceBetweenWallAndFirstLightEdge: undefined,
        distanceFromWidthWallToLightCenter: undefined,
        distanceFromWidthWallToLightEdge: undefined,
      },
    };
  }

  render() {
    const { formValues } = this.state;
    return (
      <div>
        <Display {...formValues} />
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

            const answers = {
              distanceBetweenLightCenters,
              distanceBetweenWallAndFirstLightCenter,
              distanceBetweenLightsEdgeToEdge,
              distanceBetweenWallAndFirstLightEdge,
              distanceFromWidthWallToLightCenter,
              distanceFromWidthWallToLightEdge,
            };

            setTimeout(() => {
              console.log(JSON.stringify(answers, null, 2));
              this.setState(prevState => ({
                ...prevState,
                formValues: values,
                answers,
              }));
              actions.setSubmitting(false);
              console.log(this.state)
            }, 1000);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            isSubmitting,
          }) => (
            <Form>
              <Field name="numOfLights">
                {({ field, form }) => {
                  console.log(field, form);
                  return (<FieldGroup {...field} onChange={(x) => {
                    handleChange(x);
                    console.log(x.target.value)
                    this.setState(prevState => ({
                      ...prevState,
                      formValues: { ...prevState.formValues, numOfLights: x.target.value }
                    }))
                  }} type="number" label="Number Of Lights" />)
                }}
              </Field>
              <Field name="lengthOfLight">
                {({ field, form }) => (
                  <FieldGroup {...field} type="number" label="Length Of Light" />
                )}
              </Field>
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
                    <Radio {...field} value="parallel" checked={field.value === 'parallel'} inline>
                      Parallel
                    </Radio>
                    <Radio {...field} value="row" checked={field.value === 'row'} inline>
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
                <Button onClick={handleReset}>Reset</Button>
              </ButtonToolbar>
            </Form>
          )}
        </Formik>
      </div>
    );

  }
}

export default LightSpacingForm;
