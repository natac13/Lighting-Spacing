import React from 'react';

import {
  Field,
  Form,
  ErrorMessage,
} from 'formik';
import {
  FormGroup,
  Radio,
  HelpBlock,
  Checkbox,
} from 'react-bootstrap';

import FieldGroup from '../FieldGroup';
import FormButtons from './FormButtons';

import FormInput from '../FormInput';

import style from './style.scss';

const FormDisplay = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
  isSubmitting,
  touched,
  dirty,
  setFieldValue,
  horizontalDistanceBetweenLightCenters,
  horizontalDistanceBetweenWallAndFirstLightCenter,
  verticalDistanceBetweenLightCenters,
  verticalDistanceBetweenWallAndFirstLightCenter,
}) => {

  const {
    multiRows,
    lightsPerRow,
    numOfRows,
    units,
  } = values;

  const renderMesurment = (distance) => {
    if (!distance) { return ''; }
    if (units === 'metric') {
      return `${distance}mm`;
    }
    return `${distance}"`;
  };


  const a = renderMesurment(horizontalDistanceBetweenLightCenters);
  const b = renderMesurment(horizontalDistanceBetweenWallAndFirstLightCenter);
  const c = renderMesurment(verticalDistanceBetweenWallAndFirstLightCenter);
  const d = renderMesurment(verticalDistanceBetweenLightCenters);
  return (
    <Form className={style.form}>

      <section className={style.title}>
        Input Form
      </section>

      <section className={style.answerTitle}>
        Mesurments:
      </section>

      <section className={style.answers}>
        <p>{`a: ${a}`}</p>
        <p>{`b: ${b}`}</p>
        <p>{`c: ${c}`}</p>
        {numOfRows > 1 && <p>{`d: ${d}`}</p>}
      </section>

      <section className={style.setupControls}>
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
          <ErrorMessage name="units" component={HelpBlock} />
        </React.Fragment>

        <Field name="orientation">
          {({ field }) => (
            <FormGroup>
              <Radio
                {...field}
                value="parallel"
                checked={field.value === 'parallel'}
                inline
              >
                Parallel
              </Radio>
              <Radio
                {...field}
                value="series"
                checked={field.value === 'series'}
                inline
              >
                Series
              </Radio>
            </FormGroup>
          )}
        </Field>

        <Field name="multiRows">
          {({ field }) => (
            <Checkbox
              {...field}
              onChange={(e) => {
                handleChange(e);
                if (field.value) {
                  setFieldValue('numOfRows', 1);
                  setFieldValue('numOfLights', lightsPerRow);
                  return;
                }
                setFieldValue('numOfRows', 2);
                setFieldValue('numOfLights', 2 * lightsPerRow);
              }}
              checked={field.value}
            >
              Multiple Rows of Lights
            </Checkbox>
          )}
        </Field>

        <FormButtons
          isSubmitting={isSubmitting}
          handleReset={handleReset}
          className={style.buttons}
        />
      </section>

      <section className={style.roomDetails}>
        <React.Fragment>
          <Field
            name="lengthOfRoom"
            type="number"
            label="Length Of Room"
            component={FieldGroup}
          />
          <ErrorMessage name="lengthOfRoom" component={HelpBlock} />
        </React.Fragment>

        <FormInput
          name="widthOfRoom"
          type="number"
          label="Width Of Room"
          component={FieldGroup}
        />


      </section>

      <section className={style.lightDetails}>
        <React.Fragment>
          <Field
            name="numOfLights"
            component={FieldGroup}
            onChange={(e) => {
              handleChange(e);
              const newLightsPerRow = e.target.value / numOfRows;
              setFieldValue('lightsPerRow', newLightsPerRow);
            }}
            readOnly={multiRows}
            type="number"
            min={1}
            max={numOfRows === 1 ? 12 : null}
            label="Number Of Lights"
          />
          <ErrorMessage name="numOfLights" component={HelpBlock} />
        </React.Fragment>

        <React.Fragment>
          <Field name="numOfRows">
            {({ field }) => (
              <FieldGroup
                {...field}
                onChange={(e) => {
                  handleChange(e);
                  const newNumOfLights = e.target.value * lightsPerRow;
                  setFieldValue('numOfLights', newNumOfLights);
                }}
                type="number"
                min={multiRows ? 2 : 1}
                max={12}
                label="Rows of Lights"
                readOnly={!multiRows}
              />
            )}
          </Field>
          <ErrorMessage name="numOfRows">
            {msg => <HelpBlock>{msg}</HelpBlock>}
          </ErrorMessage>
        </React.Fragment>

        <React.Fragment>
          <Field name="lightsPerRow">
            {({ field }) => (
              <FieldGroup
                {...field}
                onChange={(e) => {
                  handleChange(e);
                  const newNumOfLights = e.target.value * numOfRows;
                  setFieldValue('numOfLights', newNumOfLights);
                }}
                type="number"
                min={1}
                max={12}
                label="Lights Per Row"
                readOnly={!multiRows}
              />
            )}
          </Field>
          <ErrorMessage name="lightsPerRow">
            {msg => <HelpBlock>{msg}</HelpBlock>}
          </ErrorMessage>
        </React.Fragment>

        {/* <React.Fragment>
          <Field name="lengthOfLight">
            {({ field, form }) => (
              <FieldGroup {...field} type="number" label="Length Of Light" help={<ErrorMessage name="lengthOfLight" />} />
            )}
          </Field>
        </React.Fragment>

        <React.Fragment>
          <Field name="widthOfLight">
            {({ field, form }) => (
              <FieldGroup {...field} type="number" label="Width Of Light" />
            )}
          </Field>
        </React.Fragment> */}
      </section>
    </Form>
  )
};

export default FormDisplay;
