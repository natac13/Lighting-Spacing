import React from 'react';
import PropTypes from 'prop-types';

import {
  ButtonToolbar,
  Button,
} from 'react-bootstrap';

const FormButtons = (props) => {
  const {
    isSubmitting,
    handleReset,
    className,
  } = props;

  return (
    <ButtonToolbar className={className}>
      <Button
        type="submit"
        bsStyle="primary"
        disabled={isSubmitting}
      >
        Submit
      </Button>
      <Button
        onClick={handleReset}
        disabled={isSubmitting}
      >
        Reset
      </Button>
    </ButtonToolbar>
  );
};

FormButtons.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  handleReset: PropTypes.func.isRequired,
  className: PropTypes.string,
};

FormButtons.defaultProps = {
  className: undefined,
};

export default FormButtons;
