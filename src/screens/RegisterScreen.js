import { Formik } from 'formik';
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
import ConditionalError from '../components/ui-layout/ConditionalError';
import FormContainer from '../components/ui-layout/FormContainer';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';
import isEmptyObject from '../helpers/object/isEmptyObject';
import { login, register } from '../state/user/actions';
import registerFormSchema from '../validation/registerFormValidation';

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, userInfo, registerSuccess } = useSelector(
    (state) => state.userRegister
  );
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if (registerSuccess) {
      dispatch(login(email, password));
    }
  }, [history, userInfo, redirect, registerSuccess, dispatch, email, password]);

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={registerFormSchema}
      onSubmit={(values) => {
        const { email, name, password } = values;
        setEmail(email);
        setPassword(password);
        dispatch(register(name, email, password));
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        touched,
        errors,
        handleBlur,
      }) => {
        return (
          <FormContainer>
            <h1>Registrarse</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={handleSubmit}>
              <FormGroup controlId="name">
                <FormLabel>Tu nombre</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Nombre"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  isValid={touched.name && !errors.name}
                  onChange={handleChange}
                />
                <ConditionalError
                  errors={errors}
                  errorProp="name"
                  isTouched={touched.name}
                />
              </FormGroup>
              <FormGroup controlId="email">
                <FormLabel>Tu email</FormLabel>
                <FormControl
                  type="email"
                  placeholder="Email"
                  value={values.email}
                  isValid={touched.email && !errors.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <ConditionalError
                  errors={errors}
                  errorProp="email"
                  isTouched={touched.email}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <FormLabel>Tu contraseña</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Contraseña"
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  isValid={touched.password && !errors.password}
                  onChange={handleChange}
                />
                <ConditionalError
                  errors={errors}
                  errorProp="password"
                  isTouched={touched.password}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <FormLabel>Tu contraseña</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onBlur={handleBlur}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  onChange={handleChange}
                />
                <ConditionalError
                  errors={errors}
                  errorProp="confirmPassword"
                  isTouched={touched.confirmPassword}
                />
              </FormGroup>
              <Button
                type="submit"
                variant="primary"
                disabled={!isEmptyObject(errors)}
              >
                Registrarse
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                Ya tenes una cuenta?{' '}
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : `/register`}
                >
                  Entrar
                </Link>
              </Col>
            </Row>
          </FormContainer>
        );
      }}
    </Formik>
  );
};

export default RegisterScreen;
