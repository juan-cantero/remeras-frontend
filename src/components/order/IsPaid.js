import React from 'react';
import Message from '../ui-layout/Message';

const IsPaid = ({ isPaid, paidAt }) => {
  return isPaid ? (
    <Message variant="success">Pago el {paidAt}</Message>
  ) : (
    <Message variant="danger">Todavia no se realizo el pago</Message>
  );
};

export default IsPaid;
