import React from 'react';
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckOutSteps from '../components/checkOut/CheckOutSteps';
import OrderSummary from '../components/order/OrderSummary';
import ProductsSummary from '../components/order/ProductsSummary';
import ShippingItem from '../components/order/ShippingItem';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <CheckOutSteps login shipping payment placeOrder />
      <Row>
        <Col md={7}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <ShippingItem shippingAdress={cart.shippingAdress} />
            </ListGroupItem>
            <ListGroupItem>
              <h2>Metodo de pago</h2>
              <p>
                <strong>Metodo: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <ProductsSummary cartItems={cart.cartItems} />
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <OrderSummary cartItems={cart.cartItems} />
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
