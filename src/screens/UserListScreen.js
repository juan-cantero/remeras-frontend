import React from 'react';
import { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';
import { getUserList } from '../state/user/userListState';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const { error, loading, userList } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {};
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Administrador</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i
                      className="fas fa-times danger"
                      style={{ color: 'red' }}
                    ></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      handleDeleteUser(user._id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
