import React, { useEffect } from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CheckOutSteps from '../components/checkOut/CheckOutSteps';
import OrderSummary from '../components/order/OrderSummary';
import ProductsSummary from '../components/order/ProductsSummary';
import ShippingItem from '../components/order/ShippingItem';

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { order, success, error } = useSelector((state) => state.orderCreate);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [success, history, order]);

  return (
    <>
      <CheckOutSteps login shipping payment placeOrder />
      <Row>
        <Col md={7}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <ShippingItem shippingAddress={cart.shippingAddress} />
            </ListGroupItem>
            <ListGroupItem>
              <h2>Metodo de pago</h2>
              <p>
                <strong>Metodo: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <ProductsSummary items={cart.cartItems} />
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={4}>
          <OrderSummary
            error={error}
            shippingAddress={cart.shippingAddress}
            items={cart.cartItems}
            paymentMethod={cart.paymentMethod}
          />
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
