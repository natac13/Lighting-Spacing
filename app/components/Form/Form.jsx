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
import flatten from 'lodash/flatten';

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

function Display({
  lengthOfRoom,
  widthOfRoom,
  numOfLights,
  distanceBetweenWallAndFirstLightCenter,
  distanceBetweenLightCenters,
  renderMesurment,
}) {
  const lights = range(numOfLights).map(
    (e, i) => <div key={`#${i + 1}`} className={style.light} />,
  );
  const a = renderMesurment(distanceBetweenLightCenters);
  const b = renderMesurment(distanceBetweenWallAndFirstLightCenter);

  const toDisplay = flatten(lights.map((light, i) => {
    if (i === 0) {
      return [<span>{b}</span>, light];
    }
    if (i + 1 === lights.length) {
      return [<span>{a}</span>, light, <span>{b}</span>];
    }
    return [<span>{a}</span>, light];
  }));
  const roomWidth = 10 * numOfLights;
  return (
    <div className={style.container}>
    Display
      <div className={style.room} style={{ width: `${roomWidth}em` }}>
        {toDisplay}
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
    this.renderMesurment = this.renderMesurment.bind(this);
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

  renderMesurment(distance) {
    if (!distance) { return ''; }
    const { formValues: { units } } = this.state;
    if (units === 'metric') {
      return `${distance}mm`;
    }
    return `${distance}"`;
  }

  render() {
    const { formValues, answers } = this.state;
    return (
      <div>
        <Display {...formValues} {...answers} renderMesurment={this.renderMesurment}/>
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
