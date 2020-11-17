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
import WithLoading from '../components/hoc/withLoading';
import MyOrders from '../components/order/MyOrders';
import FormContainer from '../components/ui-layout/FormContainer';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';
import { getOrdersByUser } from '../state/order/ordersByUserState';
import { getUserDetails, updateProfile } from '../state/user';

const MyOrdersWithLoading = WithLoading(MyOrders);

const ProfileScreen = ({ history }) => {
  const { loading, error, userProfile } = useSelector(
    (state) => state.userDetails
  );

  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdateProfile);
  const {
    loading: myordersLoading,
    error: myOrdersError,
    orders,
  } = useSelector((state) => state.myOrders);
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
        dispatch(getOrdersByUser());
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
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
      <Col md={5}>
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
      <Col md={6}>
        <MyOrdersWithLoading
          isLoading={myordersLoading}
          error={myOrdersError}
          orders={orders}
        />
      </Col>
    </Row>
  );
};

export default ProfileScreen;
