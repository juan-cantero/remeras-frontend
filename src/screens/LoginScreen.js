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
import { login } from '../state/user/actions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <FormContainer>
      <h1>Entrar</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleFormSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Tu email</FormLabel>
          <FormControl
            type="email"
            placeholder="Ingresar email"
            value={email}
            name="email"
            onChange={handleEmailChange}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Tu contraseña</FormLabel>
          <FormControl
            type="password"
            placeholder="Ingresar password"
            value={password}
            name="password"
            onChange={handlePasswordChange}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary">
          Entrar
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Nuevo Cliente?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
            Registrarse
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
