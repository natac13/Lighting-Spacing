import React from 'react';
import PropTypes from 'prop-types';

import {
  Field,
  ErrorMessage,
} from 'formik';
import { HelpBlock } from 'react-bootstrap';

import { split, map, capitalize, kebabCase, join } from 'lodash/fp';

import FieldGroup from '../FieldGroup';

const FormInput = (props) => {
  const { name } = props;
  const splitOnDash = split('-');
  const label = join(' ')(map(capitalize)((splitOnDash(kebabCase(name)))))
  return (
    <React.Fragment>
      <Field
        {...props}
        name={name}
        label={label}
        component={FieldGroup}
      />
      <ErrorMessage name="lengthOfRoom" component={HelpBlock} />
    </React.Fragment>
  );
};

export default FormInput;
