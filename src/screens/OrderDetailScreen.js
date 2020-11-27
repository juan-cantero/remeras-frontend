import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import IsDelivered from '../components/order/IsDelivered';
import IsPaid from '../components/order/IsPaid';

import ProductsSummary from '../components/order/ProductsSummary';
import ShippingItem from '../components/order/ShippingItem';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';
import useAuth from '../hooks/useAuth';
import {
  getOrderDetail,
  markOrderAsDelivered,
  markOrderAsPaid,
} from '../state/order/actions';

const OrderDetailScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const [isAuthenticated, isAdmin] = useAuth();
  const { order, loading, error } = useSelector((state) => state.orderDetail);

  const {
    loading: loadingOnOrderDeliver,
    error: errorOnOrderDeliver,
    success: successOnOrderDeliver,
  } = useSelector((state) => state.orderDeliver);

  const {
    loading: loadingOnMarkAsPaid,
    error: errorOnMarkAsPaid,
    success: successOnMarkAsPaid,
  } = useSelector((state) => state.orderMarkAsPaid);

  useEffect(() => {
    dispatch(getOrderDetail(orderId));
  }, [
    orderId,
    dispatch,
    successOnOrderDeliver,
    successOnMarkAsPaid,
    loadingOnOrderDeliver,
    loadingOnMarkAsPaid,
  ]);

  const handleDelivered = () => {
    dispatch(markOrderAsDelivered(orderId));
  };

  const handlePaid = () => {
    dispatch(markOrderAsPaid(orderId));
  };

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
              <IsDelivered
                isDelivered={order.isDelivered}
                deliveredAt={order.deliveredAt}
              />
              <ShippingItem shippingAddress={order.shippingAddress} />
            </ListGroupItem>
            <ListGroupItem>
              <IsPaid isPaid={order.isPaid} paidAt={order.paidAt} />
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

        <Col>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Resumen</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Productos</Col>
                  <Col>$ {order.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
            <ListGroupItem>
              <Row>
                <Col>Precio de Envio</Col>
                <Col>$ {order.shippingPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Total</Col>
                <Col>$ {order.totalPrice}</Col>
              </Row>
            </ListGroupItem>

            {isAuthenticated && isAdmin && !order.isDelivered && (
              <ListGroupItem>
                <Button
                  type="button"
                  variant="success"
                  className="btn-block"
                  onClick={handleDelivered}
                >
                  Marcar como enviado
                </Button>
              </ListGroupItem>
            )}

            {isAuthenticated && isAdmin && !order.isPaid && (
              <ListGroupItem>
                <Button
                  type="button"
                  variant="success"
                  className="btn-block"
                  onClick={handlePaid}
                >
                  Marcar como pago
                </Button>
              </ListGroupItem>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetailScreen;
