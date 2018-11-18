import React from 'react';

import {
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

const FieldGroup = ({ id, label, className, ...props }) => {
  return (
    <FormGroup controlId={id} className={className}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
};

export default FieldGroup;
