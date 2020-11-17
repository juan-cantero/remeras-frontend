import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { payOrder } from '../state/order/orderPayState';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';

const SuccessScreen = ({ location }) => {
  const { loading, success, error } = useSelector((state) => state.orderPay);

  const [paymentDetails, setPaymentDetails] = useState(null);
  const parsed = queryString.parse(location.search);
  const { payment_id, external_reference } = parsed;
  const dispatch = useDispatch();

  useEffect(() => {
    const getPaymentDetailsFromMercadoLibre = async (payment_id) => {
      const { data } = await Axios.get(
        `https://api.mercadopago.com/v1/payments/${payment_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer TEST-3021176599215207-111516-7f1563a653b2df0477a99d566e76d447-672855699`,
          },
        }
      );
      setPaymentDetails(data);
      dispatch(payOrder(external_reference, paymentDetails));
    };
    if (paymentDetails === null) {
      getPaymentDetailsFromMercadoLibre(payment_id);
    }
  }, [paymentDetails, payment_id, dispatch, external_reference]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <h1>Gracias por su compra</h1>
  );
};

export default SuccessScreen;
