import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './Footer';
import Header from './Header';

const Layout = (props) => {
  return (
    <>
      <Header />
      <main className="Layout">{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
