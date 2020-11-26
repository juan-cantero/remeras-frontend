import React, { useState } from 'react';
import { Nav, Navbar, NavDropdown, NavLink } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { clearUserInfoInLogOut, logOut } from '../../state/user/actions';
import Filter from '../filter/Filter';
import Gallery from '../gallery/Gallery';
import SearchBox from '../searchBox/SearchBox';

const Header = () => {
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [isAuthenticated, isAdmin = false] = useAuth();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    history.push('/');
    dispatch(clearUserInfoInLogOut());
  };

  const [filter, setFilter] = useState('todos');

  const handleTodosSet = () => {
    setFilter('todos');
  };

  const handleHombreSet = () => {
    setFilter('hombre');
  };

  const handleMujerSet = () => {
    setFilter('mujer');
  };

  const handleUnisexSet = () => {
    setFilter('unisex');
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
        <SearchBox />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
      <div className="Sub-nav-bar">
        <NavLink href="/">
          <p className=" Sub-nav-bar__title text-secondary">Remeras Jacqui</p>
        </NavLink>
        <Gallery />
      </div>
      {!isAdmin && (
        <div className="Filters">
          <Link
            className="Filters__link"
            style={{ color: `${filter === 'todos' ? 'pink' : ''}` }}
            onClick={handleTodosSet}
            to="/"
          >
            Todas
          </Link>
          <Link
            className="Filters__link"
            style={{ color: `${filter === 'hombre' ? 'pink' : ''}` }}
            onClick={handleHombreSet}
            to="/genre/hombre"
          >
            Hombre
          </Link>
          <Link
            className="Filters__link"
            to="/genre/mujer"
            style={{ color: `${filter === 'mujer' ? 'pink' : ''}` }}
            onClick={handleMujerSet}
          >
            Mujer
          </Link>
          <Link
            className="Filters__link"
            to="/genre/unisex"
            style={{ color: `${filter === 'unisex' ? 'pink' : ''}` }}
            onClick={handleUnisexSet}
          >
            Unisex
          </Link>
        </div>
      )}
      <hr style={{ width: '50%', border: '1px solid #f3969a' }} />
    </header>
  );
};

export default Header;
