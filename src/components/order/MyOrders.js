import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MyOrders = ({ orders }) => {
  return (
    <>
      <h2>Mis ordenes</h2>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <th>Id</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Pagado</th>
          <th>Enviado</th>
          <th></th>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <i className="fas fa-times" style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.isDelivered.substring(0, 10)
                ) : (
                  <i className="fas fa-times" style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button className="btn-sm" variant="light">
                    Detalles
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MyOrders;
