import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Card className="my-3 py-3 rounded">
      <a href={`product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </a>
      <Card.Body>
        <a href={`product/${product._id}`}>
          <Card.Title className="text-dark" as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as="div">
          <div className="py-3">
            {product.rating}-from-
            {product.numReviews}
          </div>
        </Card.Text>
        <Card.Text as="div">{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  _id: PropTypes.string,
  image: PropTypes.string.isRequired,
};

export default Product;
