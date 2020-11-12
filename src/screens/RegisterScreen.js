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
import { Link } from 'react-router-dom';
import FormContainer from '../components/ui-layout/FormContainer';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';
import { register } from '../state/user/userRegisterState';

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
    } else {
      dispatch(register(name, email, password));
    }
  };

  const handleNameChange = (e) => [setName(e.target.value)];
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <FormContainer>
      <h1>Registrarse</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleFormSubmit}>
        <FormGroup controlId="name">
          <FormLabel>Tu nombre</FormLabel>
          <FormControl
            type="text"
            placeholder="Nombre"
            value={name}
            name="name"
            onChange={handleNameChange}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="email">
          <FormLabel>Tu email</FormLabel>
          <FormControl
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={handleEmailChange}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Tu contraseña</FormLabel>
          <FormControl
            type="password"
            placeholder="Contraseña"
            value={password}
            name="password"
            onChange={handlePasswordChange}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Tu contraseña</FormLabel>
          <FormControl
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            name="confirm password"
            onChange={handleConfirmPasswordChange}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary">
          Registrarse
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Ya tenes una cuenta?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : `/register`}>
            Entrar
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
