import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Cart from './Cart';

const CartModal = ({ show, handleClose }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered={false}
        size="lg"
        backdrop={false}
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
          <Button variant="primary" onClick={handleClose}>
            Ir al carrito de compras
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartModal;
