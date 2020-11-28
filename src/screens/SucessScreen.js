import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { payOrder } from '../state/order/actions';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';
import { Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SuccessScreen = ({ location }) => {
  const { loading, success, error } = useSelector((state) => state.orderPay);

  const parsed = queryString.parse(location.search);
  const { payment_id, external_reference } = parsed;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(payOrder(external_reference));
  }, [payment_id, dispatch, external_reference]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Alert className="text-center" variant="success">
      <Alert.Heading>Muchas gracias por su compra!!</Alert.Heading>
      <p>
        Nos alegramos que nos haya elegido, pronto le haremos la entrega de su
        remera. Puede serguir viendo más productos del catálogo si asi lo desea.
      </p>
      <hr />
      <div className="d-flex justify-content-end">
        <Link to="/">Seguir viendo el catálogo</Link>
      </div>
    </Alert>
  );
};

export default SuccessScreen;
