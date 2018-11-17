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
} from 'react-bootstrap';

import FieldGroup from '../FieldGroup';
import FormButtons from './FormButtons';

import style from './style';

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
  visualUpdateNumOfLights,
  visualUpdateOrientation,
}) => (
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
        {({ field, form }) => (
          <FormGroup>
            <Radio
              {...field}
              value="parallel"
              checked={field.value === 'parallel'}
              inline
              onChange={(x) => {
                handleChange(x);
                visualUpdateOrientation(x);
              }}
            >
              Parallel
            </Radio>
            <Radio
              {...field}
              value="series"
              checked={field.value === 'series'}
              inline
              onChange={(x) => {
                handleChange(x);
                visualUpdateOrientation(x);
              }}
            >
              Series
            </Radio>
          </FormGroup>
        )}
      </Field>

      <FormButtons
        isSubmitting={isSubmitting}
        handleReset={handleReset}
        className={style.buttons}
      />
    </section>

    <section className={style.lightDetails}>
      <React.Fragment>
        <Field name="numOfLights">
          {({ field, form }) => {
            console.log(field, form);
            return (
              <FieldGroup
                {...field}
                onChange={(x) => {
                  handleChange(x);
                  // return setFieldValue('numOfLights', x.target.value)
                  visualUpdateNumOfLights(x);
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
      </React.Fragment>

      <React.Fragment>
        <Field name="widthOfLight">
          {({ field, form }) => (
            <FieldGroup {...field} type="number" label="Width Of Light" />
          )}
        </Field>
      </React.Fragment>
    </section>

    <section className={style.roomDetails}>
      <React.Fragment>
        <Field name="lengthOfRoom">
          {({ field, form }) => (
            <FieldGroup {...field} type="number" label="Length Of Room" />
          )}
        </Field>
        <ErrorMessage name="lengthOfRoom">
          {msg => <HelpBlock>{msg}</HelpBlock>}
        </ErrorMessage>
      </React.Fragment>

      <Field name="widthOfRoom">
        {({ field, form }) => (
          <FieldGroup {...field} type="number" label="Width Of Room" />
        )}
      </Field>
    </section>











  </Form>
);

export default FormDisplay;
