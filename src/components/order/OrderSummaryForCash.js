import React from 'react';
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PriceCalculator from '../../helpers/order/PriceCalculator';

const OrderSummaryForCash = ({ items }) => {
  const priceCalculator = new PriceCalculator(items);
  const totalPrice = priceCalculator.getTotalPrice();
  return (
    <Card>
      <ListGroupItem>
        <h2>Resumen</h2>
      </ListGroupItem>
      <ListGroupItem>
        <Row>
          <Col>Total</Col>
          <Col>$ {totalPrice}</Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        <p>Terminar la compra por Whatsapp</p>
        <a
          rel="noreferrer"
          target="_blank"
          href={`https://api.whatsapp.com/send?phone=${121212}`}
        >
          <div className="Whatsapp-button" />
        </a>
      </ListGroupItem>
    </Card>
  );
};

export default OrderSummaryForCash;
