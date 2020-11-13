import React from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckOutSteps = ({ login, shipping, payment, placeOrder }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <NavItem>
        {login ? (
          <LinkContainer to="/login">
            <NavLink>Entrar</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Entrar</NavLink>
        )}
      </NavItem>

      <NavItem>
        {shipping ? (
          <LinkContainer to="/shipping">
            <NavLink>Envio</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Envio</NavLink>
        )}
      </NavItem>

      <NavItem>
        {payment ? (
          <LinkContainer to="/payment">
            <NavLink>Pago</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Pago</NavLink>
        )}
      </NavItem>

      <NavItem>
        {placeOrder ? (
          <LinkContainer to="/placeorder">
            <NavLink>Realizar Pedido</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Realizar Pedido</NavLink>
        )}
      </NavItem>
    </Nav>
  );
};

export default CheckOutSteps;
