// @ts-nocheck
import React from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { calcTotalPrice, calcTotalItems } from '../../helpers/cart/index';

const TotalPrice = ({ cartItems }) => {
  return (
    <Card className="text-center">
      <ListGroup>
        <ListGroupItem>
          <h4>Productos Totales: {calcTotalItems(cartItems)}</h4>$
          {calcTotalPrice(cartItems)}
        </ListGroupItem>
        <ListGroupItem>
          <Button
            type="button"
            variant="success"
            className="btn-block"
            disabled={cartItems.length === 0}
          >
            Hacer la compra
          </Button>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default TotalPrice;
