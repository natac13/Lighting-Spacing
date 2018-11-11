import React from 'react';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
} from 'formik';

const LightSpaceForm = (props) => {
  const initial = {
    lengthOfRoom: 0,
    widthOfRoom: 0,
    numOfLights: 0,
    widthOfLight: 0,
    lengthOfLight: 0,
    orientation: 'parallel',
  };
  return (
    <div>
      <h1>Light Spacing</h1>
      <Formik
        initialValues={initial}
        onSubmit={(values, actions) => {
          const {
            numOfLights,
            widthOfLight,
            lengthOfLight,
            lengthOfRoom,
            widthOfRoom,
            orientation,
          } = values;
          const numOfSpaces = numOfLights;
          /* Center of Light */
          // a distance between lights
          // b is half of a and the distance between the first/last light and the wall.
          const a = lengthOfRoom / numOfSpaces;
          const b = a / 2;

          /* Edge of Light */
          // c = distance between the edges of two lights.
          // d = ditance between wall and outside edge of the first and last light

          console.log(`Distance between lights is ${a}; with the first light centered at ${b} off the wall.`);
          actions.resetForm();
          console.log(actions);
        }}
        render={({ errors, touched, isSubmitting }) => (
          <Form>
            <label htmlFor="lengthOfRoom">Length Of Room</label>
            <Field type="number" name="lengthOfRoom" id="lengthOfRoom" />
            <ErrorMessage name="lengthOfRoom" component="div" />
            <br />
            <label htmlFor="numOfLights">Number of Lights</label>
            <Field type="number" name="numOfLights" id="numOfLights" />
            <ErrorMessage name="numOfLights" />
            <br />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      />
    </div>

  );
};

export default LightSpaceForm;
