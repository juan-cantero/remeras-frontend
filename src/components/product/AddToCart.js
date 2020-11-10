import React, { useState } from 'react';
import {
  Card,
  ListGroup,
  Row,
  Col,
  ListGroupItem,
  Button,
  FormCheck,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../state/cart/cartState';
import CartModal from '../Cart/CartModal';
import QuantitySelector from '../ui-layout/QuantitySelector';

const AddToCart = ({ product }) => {
  const [size, setSize] = useState('s');
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);

  const handleSizeCheck = (event) => {
    const { value } = event.target;
    setSize(value);
  };
  const handleSelectChange = (event) => {
    const { value } = event.target;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product._id, quantity, size));
    setShow(true);
  };

  return (
    <Card>
      <CartModal show={show} handleClose={handleClose} />
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
                    key={k}
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
                <QuantitySelector
                  quantity={product.stock[size]}
                  handleSelectChange={handleSelectChange}
                  selected={quantity}
                />
              </Col>
            </Row>
          </ListGroupItem>
        )}

        <ListGroupItem>
          <Button
            className="btn-block"
            type="button"
            variant="secondary"
            disabled={product.stock[size] === 0}
            onClick={handleAddToCart}
          >
            Agregar al Carrito
          </Button>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default AddToCart;
