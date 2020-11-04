import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './Footer';
import Header from './Header';

const Layout = (props) => {
  return (
    <>
      <Header />
      <Container>
        <main className="py-3">{props.children}</main>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
