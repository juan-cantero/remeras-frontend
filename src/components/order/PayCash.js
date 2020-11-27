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

const PayCash = ({ totalPrice }) => {
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
          href={`https://api.whatsapp.com/send?phone=${5491153451277}`}
        >
          <div className="Whatsapp-button" />
        </a>
      </ListGroupItem>
    </Card>
  );
};

export default PayCash;
