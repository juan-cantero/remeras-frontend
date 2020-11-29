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
import CheckOutSteps from '../components/checkOut/CheckOutSteps';
import ConditionalError from '../components/ui-layout/ConditionalError';
import FormContainer from '../components/ui-layout/FormContainer';
import isEmptyObject from '../helpers/object/isEmptyObject';
import {
  saveShippingAddress,
  saveShippingPrice,
} from '../state/cart/cartState';
import { listShippingCost } from '../state/shippingcost/list';
import shippingFormSchema from '../validation/shippingFormValidation';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  const { loading, error, shippingCosts } = useSelector(
    (state) => state.shippingCostList
  );

  useEffect(() => {
    if (shippingCosts.length === 0) {
      dispatch(listShippingCost());
    }
  }, [shippingCosts, dispatch]);

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
  if (loading) return null;
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
        const shippingCost = shippingCosts.filter(
          (s) => s.locality === locality
        );
        dispatch(saveShippingPrice(shippingCost[0].price));
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
              <FormGroup controlId="city">
                <FormLabel>Ciudad</FormLabel>
                <FormControl
                  as="select"
                  name="city"
                  value={values.city}
                  isValid={touched.city && !errors.city}
                  onChange={handleChange}
                >
                  <option value="Buenos Aires">Buenos Aires</option>
                </FormControl>
              </FormGroup>

              <FormGroup controlId="locality">
                <FormLabel>Localidad</FormLabel>
                <FormControl
                  as="select"
                  name="locality"
                  value={values.locality}
                  isValid={touched.locality && !errors.locality}
                  onChange={handleChange}
                >
                  {shippingCosts.map((s) => (
                    <option key={s._id} value={s.locality}>
                      {s.locality}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>

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
