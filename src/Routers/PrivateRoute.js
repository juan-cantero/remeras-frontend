import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuthenticated,
  isAdmin = true,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated && isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool, //use it only if you want to check of admin users
};
