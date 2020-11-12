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
import { login } from '../state/user/userLoginState';
import { getUserDetails } from '../state/user/userProfileState';
import { register } from '../state/user/userRegisterState';
import { updateProfile } from '../state/user/userUpdateProfileState';

const ProfileScreen = ({ history }) => {
  const { loading, error, userProfile } = useSelector(
    (state) => state.userDetails
  );

  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdateProfile);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!userProfile) {
        dispatch(getUserDetails());
      } else {
        console.log(userProfile);
        setName(userProfile.name);
        setEmail(userProfile.email);
      }
    }
  }, [history, userProfile, userInfo, dispatch]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
    } else {
      dispatch(updateProfile({ name: name, email: email, password: password }));
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
    <Row className="px-0">
      <Col md={6}>
        <FormContainer>
          <h2>Perfil de Usuario</h2>
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {success && (
            <Message variant="success">
              Perfil Actualizado Correctamente
            </Message>
          )}
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
            <FormGroup controlId="confirmPassword">
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
              Actualizar
            </Button>
          </Form>
        </FormContainer>
      </Col>
      <Col className="offset-md-1" md={5}>
        <h2>Mis compras</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
