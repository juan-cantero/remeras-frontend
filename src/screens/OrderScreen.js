import React, { useEffect } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import PayMercadoPago from '../components/order/PayMercadoPago';
import ProductsSummary from '../components/order/ProductsSummary';
import ShippingItem from '../components/order/ShippingItem';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';
import { getOrderDetail } from '../state/order/actions';
import PayCash from '../components/order/PayCash';

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetail);

  const { init_point, error: errorPayment } = useSelector(
    (state) => state.mercadoPagoPay
  );

  useEffect(() => {
    if (init_point) {
      window.location.replace(init_point);
    }
    dispatch(getOrderDetail(orderId));
  }, [orderId, dispatch, init_point]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2>Orden {orderId}</h2>
      <Row>
        <Col md={7}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <ShippingItem shippingAddress={order.shippingAddress} />
            </ListGroupItem>
            <ListGroupItem>
              <h2>Metodo de pago</h2>
              <p>
                <strong>Metodo: </strong>
                {order.paymentMethod}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <ProductsSummary items={order.orderItems} />
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={4}>
          {order.paymentMethod === 'mercadopago' ? (
            <PayMercadoPago
              error={errorPayment}
              external_reference={orderId}
              items={order.orderItems}
            />
          ) : (
            <PayCash items={order.orderItems} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
