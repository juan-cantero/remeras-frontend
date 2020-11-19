import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/ui-layout/FormContainer';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';
import {
  getProductDetail,
  productUpdateReset,
  updateProduct,
} from '../state/products/actions';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState({ s: 0, m: 0, l: 0, xl: 0 });
  const [sex, setSex] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);

  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );

  const {
    loading: loadingOnUpdate,
    error: errorOnUpdate,
    success,
  } = useSelector((state) => state.productUpdate);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(productUpdateReset());
      history.push('/admin/productlist');
    } else {
      if (!product || product._id !== productId) {
        dispatch(getProductDetail(productId));
      } else {
        setSex(product.forGenre);
        setName(product.name);
        setImage(product.image);
        setDescription(product.description);
        setCategory(product.category);
        setStock(product.stock);
        setUnitPrice(product.unit_price);
      }
    }
  }, [product, dispatch, productId, history, success]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(productId, {
        name,
        description,
        image,
        category,
        stock,
        unit_price: unitPrice,
        forGenre: sex,
      })
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setUnitPrice(e.target.value);
  };

  const handleSexChangeOption = (e) => {
    setSex(e.target.value);
  };

  const handleSizeSChange = (e) => {
    setStock((stock) => ({ ...stock, s: e.target.value }));
  };
  const handleSizeMChange = (e) => {
    setStock((stock) => ({ ...stock, m: e.target.value }));
  };
  const handleSizeLChange = (e) => {
    setStock((stock) => ({ ...stock, l: e.target.value }));
  };
  const handleSizeXlChange = (e) => {
    setStock((stock) => ({ ...stock, xl: e.target.value }));
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Volver
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          {loadingOnUpdate && <Loader />}
          {errorOnUpdate && <Message variant="danger">{errorOnUpdate}</Message>}
          <h1>Editar Producto</h1>
          <Form onSubmit={handleFormSubmit}>
            <FormGroup controlId="name">
              <FormLabel>Nombre del producto</FormLabel>
              <FormControl
                type="text"
                placeholder="Nombre"
                value={name}
                name="name"
                onChange={handleNameChange}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="price">
              <FormLabel>Precio</FormLabel>
              <FormControl
                type="number"
                placeholder="Precio"
                value={unitPrice}
                name="price"
                onChange={handlePriceChange}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="image">
              <FormLabel>Imagen</FormLabel>
              <FormControl
                type="text"
                placeholder="Imagen"
                value={image}
                name="image"
                onChange={handleImageChange}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="description">
              <FormLabel>Descripcion</FormLabel>
              <FormControl
                type="text"
                placeholder="Descripcion"
                value={description}
                name="description"
                onChange={handleDescriptionChange}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="category">
              <FormLabel>Categoria</FormLabel>
              <FormControl
                type="text"
                placeholder="Categoria"
                value={category}
                name="category"
                onChange={handleCategoryChange}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="sex">
              <FormLabel>Sexo</FormLabel>
              <Form.Control
                as="select"
                value={sex}
                onChange={handleSexChangeOption}
              >
                <option value="mujer">mujer</option>
                <option value="hombre">hombre</option>
                <option value="unisex">unisex</option>
              </Form.Control>
            </FormGroup>
            <FormLabel>Stock de cada talle</FormLabel>
            <Form.Row>
              <Form.Group as={Col} controlId="s">
                <Form.Label>S</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="s"
                  value={stock.s}
                  onChange={handleSizeSChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="m">
                <Form.Label>M</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="m"
                  value={stock.m}
                  onChange={handleSizeMChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="l">
                <Form.Label>L</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="l"
                  value={stock.l}
                  onChange={handleSizeLChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="xl">
                <Form.Label>XL</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="l"
                  value={stock.xl}
                  onChange={handleSizeXlChange}
                />
              </Form.Group>
            </Form.Row>

            <Button type="submit" variant="primary">
              Actualizar
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ProductEditScreen;
