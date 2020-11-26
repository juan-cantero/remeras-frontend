import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/ui-layout/FormContainer';
import Message from '../components/ui-layout/Message';
import { resetPassword } from '../state/user/actions';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.resetPassword);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <FormContainer>
      <h1>Cambiar mi Password</h1>
      <Form onSubmit={handleFormSubmit}>
        {success && (
          <Message variant="success">
            Te hemos enviado un mail para que puedas cambiar tu password
          </Message>
        )}
        <FormGroup controlId="email">
          <FormLabel>Tu email</FormLabel>
          <FormControl
            type="email"
            placeholder="Ingresar email"
            value={email}
            name="email"
            onChange={handleEmailChange}
          />
        </FormGroup>

        <Button type="submit" variant="primary">
          Resetear Password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordScreen;
