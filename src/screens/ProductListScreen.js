import React from 'react';
import { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';
import { deleteProduct, listProducts } from '../state/products/actions';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const { error, loading, products } = useSelector(
    (state) => state.productList
  );

  const {
    error: errorOnDelete,
    loading: loadingOnDelete,
    success: successOnDelete,
  } = useSelector((state) => state.productDelete);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successOnDelete]);

  const handleCreateProduct = () => {
    return null;
  };
  const handleProductDeletion = (productId) => {
    if (window.confirm('Estas seguro?')) {
      dispatch(deleteProduct(productId));
    }
  };
  return (
    <>
      <Row className="aling-items-center">
        <Col>
          <h1>Productos</h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3" onClick={handleCreateProduct}>
            <i className="fas fa-plus"></i> Create product
          </Button>
        </Col>
      </Row>
      {loadingOnDelete && <Loader />}
      {errorOnDelete && <Message variant="danger">{errorOnDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Categoria</th>
              <th>Sexo</th>
              <th>Stock</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={uuidv4()}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.forGenre}</td>
                <td>
                  S:{product.stock.s}&emsp;M:{product.stock.m}&emsp;L:
                  {product.stock.l}&emsp;XL:{product.stock.xl}
                </td>
                <td>${product.unit_price}</td>

                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      handleProductDeletion(product._id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
