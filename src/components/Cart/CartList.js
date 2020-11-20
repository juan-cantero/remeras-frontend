import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Image,
  Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../state/cart/cartState';
import QuantitySelector from '../ui-layout/QuantitySelector';

const CartList = ({ cartItems }) => {
  const dispatch = useDispatch();
  return (
    <ListGroup>
      {cartItems.map((product) => {
        return (
          <ListGroupItem key={product.id + product.size}>
            <Row className="cart-container">
              <Col md={3} sm={3} xs={4}>
                <Image
                  src={`https://r-emeras-aws-bucket.s3-sa-east-1.amazonaws.com/${product.image}`}
                  alt={product.name}
                  fluid
                  rounded
                />
              </Col>
              <Col md={2} sm={3} xs={3}>
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </Col>
              <Col className="d-none d-sm-block" md={2} sm={2} xs={2}>
                ${product.unit_price}
              </Col>
              <Col md={3} sm={3} xs={3} className="text-center">
                <QuantitySelector
                  quantity={product.stock[product.size]}
                  selected={product.quantity}
                  handleSelectChange={(e) => {
                    dispatch(
                      addToCart(product.id, e.target.value, product.size)
                    );
                  }}
                />
              </Col>

              <Col md={2} xs={2}>
                <Button
                  type="button"
                  variant="light"
                  onClick={() => {
                    dispatch(removeFromCart(product.id, product.size));
                  }}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default CartList;
