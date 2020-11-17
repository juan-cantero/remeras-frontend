import React, { useEffect } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import OrderSummaryForCash from '../components/order/OrderSummaryForCash';

import Pay from '../components/order/Pay';
import ProductsSummary from '../components/order/ProductsSummary';
import ShippingItem from '../components/order/ShippingItem';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';
import { getOrderDetail } from '../state/order/orderDetailState';

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetail);

  const {
    init_point,
    loading: loadingPayment,
    error: errorPayment,
  } = useSelector((state) => state.mercadoPagoPay);

  useEffect(() => {
    if (init_point) {
      window.open(init_point, '_blank');
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
            <Pay
              error={errorPayment}
              external_reference={orderId}
              items={order.orderItems}
            />
          ) : (
            <OrderSummaryForCash items={order.orderItems} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
