import React from 'react';
import Message from '../ui-layout/Message';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

const IsPaid = ({ isPaid, paidAt }) => {
  return isPaid ? (
    <Message variant="success">
      Pago el dia {moment(paidAt).format('l')}
    </Message>
  ) : (
    <Message variant="danger">Todavia no se realizo el pago</Message>
  );
};

export default IsPaid;
