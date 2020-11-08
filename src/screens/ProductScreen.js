import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
  Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Price from '../components/Price';
import { getProductDetail } from '../state/products/productState';

const ProductScreen = ({ match }) => {
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail(match.params.id));
  }, [dispatch, match]);

  if (!product) return <h1>loading..</h1>;
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
    </Container>
  );
};

export default ProductScreen;
