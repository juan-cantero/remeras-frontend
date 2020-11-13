import React, { useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import CheckOutSteps from '../components/checkOut/CheckOutSteps';
import FormContainer from '../components/ui-layout/FormContainer';
import { saveShippingAdress } from '../state/cart/cartState';

const ShippingScreen = ({ history }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const dispatch = useDispatch();
  const handleAdressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleLocalityChange = (e) => {
    setLocality(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAdress({ address, locality, city, postalCode }));
    history.push('/payment');
  };
  return (
    <FormContainer>
      <CheckOutSteps login shipping />
      <h2>Direccion de envio</h2>
      <Form onSubmit={handleFormSubmit}>
        <FormGroup controlId="street">
          <FormLabel>Calle</FormLabel>
          <FormControl
            type="text"
            placeholder="Localidad"
            value={address}
            name="street"
            onChange={handleAdressChange}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="city">
          <FormLabel>Ciudad</FormLabel>
          <FormControl
            type="text"
            placeholder="Ciudad"
            value={city}
            name="city"
            onChange={handleCityChange}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="locality">
          <FormLabel>Localidad</FormLabel>
          <FormControl
            type="text"
            placeholder="Localidad"
            value={locality}
            name="locality"
            onChange={handleLocalityChange}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="postal code">
          <FormLabel>Codigo Postal</FormLabel>
          <FormControl
            type="text"
            placeholder="codigo postal"
            value={postalCode}
            name="city"
            onChange={handlePostalCodeChange}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="success">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
