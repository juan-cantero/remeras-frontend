import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="Footer">
      <Container>
        <Row>
          <Col className="text-center py-3">copyright &copy;Remerasjacqui</Col>
          <Col className="text-center py-3">
            Hecho por{' '}
            <a href="mailto:juan.cantero@outlook.com">Juan Carlos Cantero</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
