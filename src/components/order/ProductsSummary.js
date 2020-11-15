import React from 'react';
import { ListGroupItem, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../ui-layout/Message';

const ProductsSummary = ({ items }) => {
  return (
    <>
      <h2>Productos Elegidos</h2>
      {items.length === 0 ? (
        <Message variant="info">Tu carrito esta vacio</Message>
      ) : (
        items.map((item) => (
          <ListGroupItem>
            <Row>
              <Col xs={2} sm={2} md={1}>
                <Image src={item.image} alt={item.name} fluid rounded />
              </Col>
              <Col>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
              </Col>
              <Col md={4}>
                {item.quantity} X ${item.price} = ${item.quantity * item.price}
              </Col>
            </Row>
          </ListGroupItem>
        ))
      )}
    </>
  );
};

export default ProductsSummary;
