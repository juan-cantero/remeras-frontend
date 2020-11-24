import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { clearUserInfoInLogOut, logOut } from '../../state/user/actions';
import SearchBox from '../searchBox/SearchBox';

const Header = () => {
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
    history.push('/');
    dispatch(clearUserInfoInLogOut());
  };

  return (
    <header>
      <Navbar
        className="py-2"
        bg="primary"
        variant="dark"
        collapseOnSelect
        expand="md"
      >
        <LinkContainer to="/">
          <Navbar.Brand>Re-meras</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox />
          <Nav className="ml-auto ">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Carrito
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="userName">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogOut}>
                    Salir
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">
                  <i className="fas fa-user"></i> Entrar
                </Nav.Link>
              )}
            </LinkContainer>
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Administrador" id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Usuarios</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Productos</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Pedidos </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
