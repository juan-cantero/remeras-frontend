import React from 'react';
import PropTypes from 'prop-types';

const ConditionalError = ({ errors, errorProp }) => {
  return errors ? <p className="text-danger">{errors[errorProp]}</p> : null;
};

ConditionalError.propTypes = {
  error: PropTypes.object.isRequired,
  errorProp: PropTypes.string.isRequired,
};

export default ConditionalError;
