import { Formik } from 'formik';
import React, { useEffect } from 'react';
import {
  Button,
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
import { getShippingCost } from '../state/shippingcost/get';
import {
  shippingCostUpdateReset,
  updateShippingCost,
} from '../state/shippingcost/actions';

const ShippingCostEditScreen = ({ match, history }) => {
  const values = {
    country: '',
    province: '',
    locality: '',
    postalCode: '',
    price: 0,
  };

  const id = match.params.id;
  const { loading, error, shippingCostDetail } = useSelector(
    (state) => state.shippingCostGet
  );

  const { loading: loadingUpdate, errorUpdate, updatedSuccess } = useSelector(
    (state) => state.shippingCostUpdate
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (updatedSuccess) {
      history.push('/admin/shippingcost/list');
      dispatch(shippingCostUpdateReset());
    } else {
      if (!shippingCostDetail || shippingCostDetail._id !== id) {
        dispatch(getShippingCost(id));
      } else {
        const {
          country,
          province,
          postalCode,
          locality,
          price,
        } = shippingCostDetail;
        values.country = country;
        values.province = province;
        values.locality = locality;
        values.postalCode = postalCode;
        values.price = price;
      }
    }
  }, [shippingCostDetail, history, dispatch, id, updatedSuccess, values]);

  return (
    <>
      <Link to="/admin/shippingcost/list" className="btn btn-light my-3">
        Volver
      </Link>
      {loading || loadingUpdate ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : errorUpdate ? (
        <Message variant="danger">{errorUpdate}</Message>
      ) : (
        <Formik
          initialValues={values}
          onSubmit={(values) => {
            const shippingCostData = {
              country: values.country,
              province: values.province,
              locality: values.locality,
              postalCode: values.postalCode,
              price: values.price,
            };
            dispatch(updateShippingCost(id, shippingCostData));
          }}
        >
          {({ handleSubmit, handleChange, touched, values, errors }) => {
            return (
              <FormContainer>
                <h1>Editar Costo de envio</h1>
                <Form onSubmit={handleSubmit}>
                  <FormGroup controlId="Country">
                    <FormLabel>Pais</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Pais"
                      value={values.country}
                      name="country"
                      isValid={touched.country && !errors.country}
                      onChange={handleChange}
                    ></FormControl>
                  </FormGroup>
                  <FormGroup controlId="province">
                    <FormLabel>Provincia</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Provincia"
                      value={values.province}
                      name="province"
                      isValid={touched.province && !errors.province}
                      onChange={handleChange}
                    ></FormControl>
                  </FormGroup>

                  <FormGroup controlId="locality">
                    <FormLabel>Localidad</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Localidad"
                      value={values.locality}
                      name="locality"
                      isValid={touched.locality && !errors.locality}
                      onChange={handleChange}
                    ></FormControl>
                  </FormGroup>

                  <FormGroup controlId="postalcode">
                    <FormLabel>Codigo Postal</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Codigo postal"
                      value={values.postalCode}
                      name="postalCode"
                      isValid={touched.postalCode && !errors.postalCode}
                      onChange={handleChange}
                    ></FormControl>
                  </FormGroup>

                  <FormGroup controlId="price">
                    <FormLabel>Precio de envio</FormLabel>
                    <FormControl
                      type="text"
                      placeholder="Precio"
                      value={values.price}
                      name="price"
                      isValid={touched.price && !errors.price}
                      onChange={handleChange}
                    ></FormControl>
                  </FormGroup>

                  <Button type="submit" variant="primary">
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

export default ShippingCostEditScreen;
