import React from 'react';
import {
  Col,
  Container,
  ListGroup,
  Row,
  Image,
  ListGroupItem,
  Card,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Price from '../Price';
import AddToCart from './AddToCart';

const ProductDetail = ({ product }) => {
  return (
    <Container>
      <Link className="btn btn-light my-3" to="/">
        Volver
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3 className="text-center">{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Price price={product.price} />
            </ListGroupItem>
            <ListGroupItem>{`Descripcion: ${product.description}`}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <AddToCart product={product} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
