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
import { payMercadoPago } from '../../state/mercadopago/mercadoPagoState';
import Message from '../ui-layout/Message';

const PayMercadoPago = ({
  items,
  itemsPrice,
  shippingPrice,
  totalPrice,
  external_reference,
  error,
}) => {
  const dispatch = useDispatch();

  const handlePlaceOrder = () => {
    dispatch(payMercadoPago(items, external_reference));
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
        {error && <Message variant="danger">{error}</Message>}
      </ListGroupItem>
      <ListGroupItem>
        <Button
          type="button"
          variant="info"
          className="btn-block"
          disabled={items.length === 0}
          onClick={handlePlaceOrder}
        >
          Pagar con Mercado Pago
        </Button>
      </ListGroupItem>
    </Card>
  );
};

export default PayMercadoPago;
