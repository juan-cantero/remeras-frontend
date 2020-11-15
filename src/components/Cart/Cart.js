import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TotalPrice from '../price/TotalPrice';
import Message from '../ui-layout/Message';
import CartList from './CartList';
import PropTypes from 'prop-types';

const Cart = ({ withTotalPrice }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const cartListWidth = withTotalPrice ? 8 : 12;

  return (
    <Row>
      <Col md={cartListWidth} sm={withTotalPrice} xs={withTotalPrice}>
        {cartItems.length === 0 ? (
          <Message variant="info">
            <h1>Tu carrito esta vacio</h1>
            <Link to="/">Volver</Link>
          </Message>
        ) : (
          <CartList cartItems={cartItems} />
        )}
      </Col>
      {withTotalPrice && (
        <Col md={4}>
          <TotalPrice cartItems={cartItems} />
        </Col>
      )}
    </Row>
  );
};

Cart.propTypes = {
  withTotalPrice: PropTypes.bool,
};

export default Cart;
