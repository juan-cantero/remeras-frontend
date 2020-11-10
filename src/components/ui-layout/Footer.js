import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="Footer">
      <Container>
        <Row>
          <Col className="text-center py-3">copyright &copy;Re-meras</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
