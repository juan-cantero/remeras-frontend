import React from 'react';
import {
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import PriceCalculator from '../../helpers/order/PriceCalculator';

const OrderSummary = ({ cartItems }) => {
  const priceCalculator = new PriceCalculator(cartItems);
  let productsTotalPrice = priceCalculator.getItemsPrice();
  let shippingPrice = priceCalculator.getShippingPrice();
  let totalPrice = priceCalculator.getTotalPrice();
  const handleBuyOrder = () => {};
  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroupItem>
          <h2>Resumen</h2>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col>Productos</Col>
            <Col>$ {productsTotalPrice}</Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
      <ListGroupItem>
        <Row>
          <Col>Precio de Envio</Col>
          <Col>$ {shippingPrice}</Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        <Row>
          <Col>Total</Col>
          <Col>$ {totalPrice}</Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        <Button
          type="button"
          variant="success"
          className="btn-block"
          disabled={cartItems.length === 0}
          onClick={handleBuyOrder}
        >
          Comprar
        </Button>
      </ListGroupItem>
    </Card>
  );
};

export default OrderSummary;
