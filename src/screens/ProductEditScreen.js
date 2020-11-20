import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  FormFile,
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

import { Formik } from 'formik';
import productFormSchema from '../validation/productFormValidation';
import isEmptyObject from '../helpers/object/isEmptyObject.js';
import ConditionalError from '../components/ui-layout/ConditionalError';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [imageFile, setImageFile] = useState(null);
  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );

  const values = {
    name: '',
    image: '',
    description: '',
    category: '',
    sex: '',
    unitPrice: 0,
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
  };

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
        values.name = product.name;
        values.image = product.image;
        values.sex = product.forGenre;
        values.description = product.description;
        values.category = product.category;
        values.unitPrice = product.unit_price;
        values.s = product.stock.s;
        values.m = product.stock.m;
        values.l = product.stock.l;
        values.xl = product.stock.xl;
      }
    }
  }, [product, dispatch, productId, history, success, values, values.image]);

  const handleFileUpload = (e) => {
    setImageFile(e.target.files[0]);
    values.image = e.target.files[0].name;
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
        <Formik
          initialValues={values}
          validationSchema={productFormSchema}
          onSubmit={(values) => {
            dispatch(
              updateProduct(
                productId,
                {
                  name: values.name,
                  description: values.description,
                  image: values.image,
                  category: values.category,
                  stock: {
                    s: values.s,
                    m: values.m,
                    l: values.l,
                    xl: values.xl,
                  },
                  unit_price: values.unitPrice,
                  forGenre: values.sex,
                },
                imageFile
              )
            );
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => {
            return (
              <FormContainer>
                {loadingOnUpdate && <Loader />}
                {errorOnUpdate && (
                  <Message variant="danger">{errorOnUpdate}</Message>
                )}
                <h1>Editar Producto</h1>
                <Form onSubmit={handleSubmit}>
                  <FormGroup controlId="name">
                    <FormLabel>Nombre del producto</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Nombre"
                      onBlur={handleBlur}
                      value={values.name}
                      name="name"
                      isValid={touched.name && !errors.name}
                      onChange={handleChange}
                    />
                    <ConditionalError errors={errors} errorProp="name" />
                  </FormGroup>
                  <FormGroup controlId="price">
                    <FormLabel>Precio</FormLabel>
                    <FormControl
                      type="number"
                      placeholder="Precio"
                      value={values.unitPrice}
                      onBlur={handleBlur}
                      name="unitPrice"
                      isValid={touched.unitPrice && !errors.unitPrice}
                      onChange={handleChange}
                    />
                    <ConditionalError errors={errors} errorProp="unitPrice" />
                  </FormGroup>
                  <FormGroup controlId="image">
                    <FormLabel>Imagen</FormLabel>

                    <FormFile
                      id="image file"
                      lang="es"
                      accept="image/jpeg"
                      label="Elegir Imagen"
                      custom
                      onChange={handleFileUpload}
                      data-browse="Subir"
                    />
                    {imageFile && (
                      <p className="text-success">{imageFile.name}</p>
                    )}
                  </FormGroup>
                  <FormGroup controlId="description">
                    <FormLabel>Descripcion</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Descripcion"
                      value={values.description}
                      onBlur={handleBlur}
                      name="description"
                      isValid={touched.description && !errors.description}
                      onChange={handleChange}
                    />

                    <ConditionalError errors={errors} errorProp="description" />
                  </FormGroup>
                  <FormGroup controlId="category">
                    <FormLabel>Categoria</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Categoria"
                      onBlur={handleBlur}
                      value={values.category}
                      name="category"
                      isValid={touched.category && !errors.category}
                      onChange={handleChange}
                    />
                    <ConditionalError errors={errors} errorProp="category" />
                  </FormGroup>
                  <FormGroup controlId="sex">
                    <FormLabel>Sexo</FormLabel>
                    <Form.Control
                      as="select"
                      value={values.sex}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isValid={touched.sex && !errors.sex}
                    >
                      <option value="mujer">mujer</option>
                      <option value="hombre">hombre</option>
                      <option value="unisex">unisex</option>
                    </Form.Control>
                    <ConditionalError errors={errors} errorProp="sex" />
                  </FormGroup>
                  <FormLabel>Stock de cada talle</FormLabel>
                  <Form.Row>
                    <Form.Group as={Col} controlId="s">
                      <Form.Label>S</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="s"
                        onBlur={handleBlur}
                        name="s"
                        isValid={touched.s && !errors.s}
                        value={values.s}
                        onChange={handleChange}
                      />
                      <ConditionalError errors={errors} errorProp="s" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="m">
                      <Form.Label>M</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="m"
                        onBlur={handleBlur}
                        name="m"
                        isValid={touched.m && !errors.m}
                        value={values.m}
                        onChange={handleChange}
                      />
                      <ConditionalError errors={errors} errorProp="m" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="l">
                      <Form.Label>L</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="l"
                        onBlur={handleBlur}
                        name="l"
                        isValid={touched.l && !errors.l}
                        value={values.l}
                        onChange={handleChange}
                      />
                      <ConditionalError errors={errors} errorProp="l" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="xl">
                      <Form.Label>XL</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="xl"
                        onBlur={handleBlur}
                        name="xl"
                        isValid={touched.xl && !errors.xl}
                        value={values.xl}
                        onChange={handleChange}
                      />
                      <ConditionalError errors={errors} errorProp="xl" />
                    </Form.Group>
                  </Form.Row>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!isEmptyObject(errors)}
                  >
                    Actualizar
                  </Button>
                </Form>
              </FormContainer>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default ProductEditScreen;
