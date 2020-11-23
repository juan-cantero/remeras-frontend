import { Formik } from 'formik';
import React from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckOutSteps from '../components/checkOut/CheckOutSteps';
import FormContainer from '../components/ui-layout/FormContainer';
import { saveShippingAddress } from '../state/cart/cartState';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  const { address, city, locality, postalCode } = shippingAddress;

  return (
    <Formik
      initialValues={{
        address: address,
        city: city,
        locality: locality,
        postalCode: postalCode,
      }}
      onSubmit={(values) => {
        const { address, city, locality, postalCode } = values;
        dispatch(saveShippingAddress({ address, city, locality, postalCode }));
        history.push('/payment');
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors,
      }) => {
        return (
          <FormContainer>
            <CheckOutSteps login shipping />
            <h2>Direccion de envio</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup controlId="street">
                <FormLabel>Calle</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Calle"
                  value={values.address}
                  name="address"
                  onChange={handleChange}
                ></FormControl>
              </FormGroup>

              <FormGroup controlId="city">
                <FormLabel>Ciudad</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Ciudad"
                  value={values.city}
                  name="city"
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
                  onChange={handleChange}
                ></FormControl>
              </FormGroup>
              <FormGroup controlId="postal code">
                <FormLabel>Codigo Postal</FormLabel>
                <FormControl
                  type="text"
                  placeholder="codigo postal"
                  value={values.postalCode}
                  name="postalCode"
                  onChange={handleChange}
                ></FormControl>
              </FormGroup>
              <Button type="submit" variant="success">
                Continuar
              </Button>
            </Form>
          </FormContainer>
        );
      }}
    </Formik>
  );
};

export default ShippingScreen;
