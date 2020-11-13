import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckOutSteps from '../components/checkOut/CheckOutSteps';
import FormContainer from '../components/ui-layout/FormContainer';
import { savePaymentMethod } from '../state/cart/cartState';

const PaymentMethodScreen = ({ history }) => {
  const { shippingAdress } = useSelector((state) => state.cart);

  // useEffect(() => {
  //   if (!shippingAdress.adress) {
  //     history.push('/shipping');
  //   }
  // }, [shippingAdress, history]);

  const [paymentMethod, setPaymentMethod] = useState('efectivo');
  const dispatch = useDispatch();

  const handleSetPaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };
  return (
    <FormContainer>
      <CheckOutSteps login shipping payment />
      <h2>Metodo de Pago</h2>
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <FormLabel as="legend">Seleccionar metodo</FormLabel>
          <Col>
            <FormCheck
              type="radio"
              label="Efectivo"
              id="Efectivo"
              name="paymentMethod"
              value="efectivo"
              checked
              onChange={handleSetPaymentMethod}
            ></FormCheck>
          </Col>
        </FormGroup>
        <Button type="submit" variant="success">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentMethodScreen;
