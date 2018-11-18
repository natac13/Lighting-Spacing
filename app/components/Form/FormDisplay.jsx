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
}) => {

  const {
    multiRows,
    lightsPerRow,
    numOfRows,
  } = values;
  return (
    <Form className={style.form}>

      <section className={style.title}>
        Input Form
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
          <ErrorMessage name="units">
            {msg => <HelpBlock>{msg}</HelpBlock>}
          </ErrorMessage>
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
          <Field name="lengthOfRoom">
            {({ field }) => (
              <FieldGroup {...field} type="number" label="Length Of Room" />
            )}
          </Field>
          <ErrorMessage name="lengthOfRoom">
            {msg => <HelpBlock>{msg}</HelpBlock>}
          </ErrorMessage>
        </React.Fragment>

        <Field name="widthOfRoom">
          {({ field }) => (
            <FieldGroup {...field} type="number" label="Width Of Room" />
          )}
        </Field>

      </section>

      <section className={style.lightDetails}>
        <React.Fragment>
          <Field name="numOfLights">
            {({ field, form }) => {
              console.log(field, form);
              return (
                <FieldGroup
                  {...field}
                  readOnly={multiRows}
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
