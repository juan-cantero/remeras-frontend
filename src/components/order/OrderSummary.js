import React from 'react';
import {
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import PriceCalculator from '../../helpers/order/PriceCalculator';
import { createOrder } from '../../state/order/actions';
import Message from '../ui-layout/Message';

const OrderSummary = ({
  items,
  shippingAddress,
  shippingPrice,
  paymentMethod,
  error,
}) => {
  const PRICE_FOR_SHIPPING_PRICE = 2000;
  const dispatch = useDispatch();
  const priceCalculator = new PriceCalculator(
    items,
    shippingPrice,
    PRICE_FOR_SHIPPING_PRICE
  );
  let itemsPrice = priceCalculator.getItemsPrice();
  let calculatedShippingPrice = priceCalculator.getShippingPrice();
  let totalPrice = priceCalculator.getTotalPrice();

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: items,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: calculatedShippingPrice,
        totalPrice: totalPrice,
      })
    );
  };
  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroupItem>
          <h2>Resumen</h2>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col>Productos</Col>
            <Col>$ {itemsPrice}</Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
      <ListGroupItem>
        <Row>
          <Col>Precio de Envio</Col>
          <Col>$ {calculatedShippingPrice}</Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        <Row>
          <Col>Total</Col>
          <Col>$ {totalPrice}</Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        {error && <Message variant="danger">{error}</Message>}
      </ListGroupItem>
      <ListGroupItem>
        <Button
          type="button"
          variant="success"
          className="btn-block"
          disabled={items.length === 0}
          onClick={handlePlaceOrder}
        >
          Hacer el pedido
        </Button>
      </ListGroupItem>
    </Card>
  );
};

export default OrderSummary;
