import React, { useState } from 'react';
import {
  Card,
  ListGroup,
  Row,
  Col,
  ListGroupItem,
  Button,
  FormControl,
  FormCheck,
} from 'react-bootstrap';

const AddToCart = ({ product }) => {
  const [size, setSize] = useState('s');
  const [quantity, setQuantity] = useState(0);

  const handleSizeCheck = (event) => {
    const { value } = event.target;
    setSize(value);
  };
  const handleSelectChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setQuantity(value);
  };

  return (
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
          <Row>
            <Col>Estado</Col>
            <Col>
              <strong>
                {product.stock[size] > 0 ? 'Disponible' : 'Sin Stock'}
              </strong>
            </Col>
          </Row>
        </ListGroupItem>

        <ListGroupItem>
          <Row>
            <Col>Talle</Col>
            <Col>
              {Object.keys(product.stock).map((k) => {
                return (
                  <FormCheck
                    name="size"
                    type="radio"
                    inline
                    label={k.toUpperCase()}
                    value={k}
                    defaultChecked={size === k}
                    onChange={handleSizeCheck}
                  />
                );
              })}
            </Col>
          </Row>
        </ListGroupItem>

        {product.stock[size] > 0 && (
          <ListGroupItem>
            <Row>
              <Col>Cantidad</Col>
              <Col>
                <FormControl as="select" value="" onChange={handleSelectChange}>
                  {[...Array(product.stock[size]).keys()].map((x) => {
                    return (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    );
                  })}
                </FormControl>
              </Col>
            </Row>
          </ListGroupItem>
        )}

        <ListGroupItem>
          <Button
            className="btn-block btn-secondary"
            type="button"
            disabled={product.stock[size] === 0}
          >
            Agregar al Carrito
          </Button>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default AddToCart;
