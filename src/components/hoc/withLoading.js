import React from 'react';
import Loader from '../ui-layout/Loader';
import Message from '../ui-layout/Message';

const WithLoading = (Component) => {
  return ({ isLoading, error, ...props }) => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <Message variant="danger">{error}</Message>;
    }
    return <Component {...props} />;
  };
};

export default WithLoading;
