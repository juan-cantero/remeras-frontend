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

const OrderSummary = ({ items, shippingAddress, paymentMethod, error }) => {
  const dispatch = useDispatch();
  const priceCalculator = new PriceCalculator(items);
  let itemsPrice = priceCalculator.getItemsPrice();
  let shippingPrice = priceCalculator.getShippingPrice();
  let totalPrice = priceCalculator.getTotalPrice();

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: items,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
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
