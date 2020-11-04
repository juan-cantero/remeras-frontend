import React from 'react';
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Price from '../components/Price';
import Product from '../components/Product';
import products from '../products';

const ProductScreen = ({ match }) => {
  const product = products.find((product) => product._id === match.params.id);
  return (
    <>
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
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Price price={product.price} />
            </ListGroupItem>
            <ListGroupItem>{`Descripcion: ${product.description}`}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Precio:</Col>
                  <Col>
                    <strong>{`$ ${product.price}`}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button className="btn-block btn-secondary" type="button">
                  Agregar al Carrito
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
