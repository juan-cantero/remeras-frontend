import React from 'react';
import PropTypes from 'prop-types';

const ConditionalError = ({ errors, errorProp, isTouched }) => {
  return errors && isTouched ? (
    <p className="text-danger">{errors[errorProp]}</p>
  ) : null;
};

ConditionalError.propTypes = {
  error: PropTypes.object.isRequired,
  errorProp: PropTypes.string.isRequired,
  isTouched: PropTypes.bool.isRequired,
};

export default ConditionalError;
