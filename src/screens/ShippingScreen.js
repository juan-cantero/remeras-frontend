import React, { useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import FormContainer from '../components/ui-layout/FormContainer';

const ShippingScreen = ({ history }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleAdressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <FormContainer>
      <Form onSubmit={handleFormSubmit}>
        <FormGroup controlId="address">
          <FormLabel>Direccion</FormLabel>
          <FormControl
            type="text"
            placeholder="Direccion"
            value={address}
            name="adress"
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
