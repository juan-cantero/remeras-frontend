import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from './Product';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await Axios.get('http://localhost:5000/api/product');
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <Row>
      {products.map((product) => (
        <Col sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
