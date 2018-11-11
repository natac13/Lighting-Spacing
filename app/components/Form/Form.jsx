import React, { Component } from 'react';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
} from 'formik';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  ButtonToolbar,
  Button,
} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

 /* eslint-disable */


class LightSpacingForm extends Component {


  render() {
    return (
      <Formik
        initialValues={{
          numOfLights: 0,
          lengthOfRoom: 0,
          widthOfRoom: 0,
          lengthOfLights: 0,
          widthOfLights: 0,
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, handleReset, isSubmitting }) => (
          <Form >
            <Field name="numOfLights">
              {({ field, form }) => (
                <FieldGroup {...field} type="number" label="Number Of Lights" />
              )}
            </Field>
            <Field name="lengthOfRoom">
              {({ field, form }) => (
                <FieldGroup {...field} type="number" label="Length Of Room" />
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
    );
  }
}

export default LightSpacingForm;