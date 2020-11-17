import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/ui-layout/FormContainer';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';
import { getUser } from '../state/user/actions';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, dispatch, userId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleIsAdminCheck = (e) => {
    setIsAdmin(e.target.checked);
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Volver
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <h1>Editar Usuario</h1>
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
            <FormGroup controlId="isadmin">
              <FormCheck
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={handleIsAdminCheck}
              ></FormCheck>
            </FormGroup>

            <Button type="submit" variant="primary">
              Actualizar
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default UserEditScreen;
