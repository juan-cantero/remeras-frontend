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
import ConditionalError from '../components/ui-layout/ConditionalError';
import FormContainer from '../components/ui-layout/FormContainer';
import isEmptyObject from '../helpers/object/isEmptyObject';
import { saveShippingAddress } from '../state/cart/cartState';
import shippingFormSchema from '../validation/shippingFormValidation';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  let address = '';
  let city = '';
  let locality = '';
  let postalCode = '';

  if (shippingAddress) {
    address = shippingAddress.address;
    city = shippingAddress.city;
    locality = shippingAddress.locality;
    postalCode = shippingAddress.postalCode;
  }

  return (
    <Formik
      initialValues={{
        address: address,
        city: city,
        locality: locality,
        postalCode: postalCode,
      }}
      validationSchema={shippingFormSchema}
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
        validateOnBlur,
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
                  onBlur={handleBlur}
                  name="address"
                  isValid={touched.address && !errors.address}
                  onChange={handleChange}
                />
                <ConditionalError
                  errors={errors}
                  errorProp="address"
                  isTouched={touched.address}
                />
              </FormGroup>

              <FormGroup controlId="city">
                <FormLabel>Ciudad</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Ciudad"
                  value={values.city}
                  onBlur={handleBlur}
                  name="city"
                  isValid={touched.city && !errors.city}
                  onChange={handleChange}
                />
                <ConditionalError
                  errors={errors}
                  errorProp="city"
                  isTouched={touched.city}
                />
              </FormGroup>
              <FormGroup controlId="locality">
                <FormLabel>Localidad</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Localidad"
                  value={values.locality}
                  onBlur={handleBlur}
                  name="locality"
                  isValid={touched.locality && !errors.locality}
                  onChange={handleChange}
                />
                <ConditionalError
                  errors={errors}
                  errorProp="locality"
                  isTouched={touched.locality}
                />
              </FormGroup>
              <FormGroup controlId="postal code">
                <FormLabel>Codigo Postal</FormLabel>
                <FormControl
                  type="text"
                  placeholder="codigo postal"
                  value={values.postalCode}
                  onBlur={handleBlur}
                  name="postalCode"
                  isValid={touched.postalCode && !errors.postalCode}
                  onChange={handleChange}
                />
                <ConditionalError
                  errors={errors}
                  errorProp="postalCode"
                  isTouched={touched.postalCode}
                />
              </FormGroup>
              <Button
                type="submit"
                variant="success"
                disabled={!isEmptyObject(errors)}
              >
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
