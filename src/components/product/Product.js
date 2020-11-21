import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <Card className="my-3 py-3 px-2 rounded">
      <Link to={`product/${product._id}`}>
        <Card.Img
          src={`https://r-emeras-aws-bucket.s3-sa-east-1.amazonaws.com/${product.image}`}
          alt={product.name}
          variant="top"
        />
      </Link>
      <Card.Body className="text-center">
        <Link to={`product/${product._id}`}>
          <Card.Title className="text-dark" as="div">
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <h3 className="text-dark">{'$' + product.unit_price}</h3>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  _id: PropTypes.string,
  image: PropTypes.string.isRequired,
};

export default Product;
