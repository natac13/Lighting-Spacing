import React from 'react';

import {
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

const FieldGroup = ({
  field,
  id,
  label,
  className,
  ...props
}) => {
  return (
    <FormGroup controlId={id} className={className}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...field} {...props} />
    </FormGroup>
  );
};

export default FieldGroup;
