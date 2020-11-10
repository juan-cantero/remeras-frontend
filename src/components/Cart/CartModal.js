import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Cart from './Cart';

const CartModal = ({ show, handleClose }) => {
  const history = useHistory();
  const handleGoToCart = () => {
    history.push('/cart');
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered={false}
        size="lg"
        keyboard={false}
        styles={{ right: 0 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cart />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Seguir viendo
          </Button>
          <Button variant="success" onClick={handleGoToCart}>
            Ir al carrito de compras
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartModal;
