import React from 'react';
import { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';
import { listOrders } from '../state/order/list';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const { error, loading, orderList } = useSelector((state) => state.orderList);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  return (
    <>
      <h1>Ordenes</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Pago</th>
              <th>Fue Enviado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.purchaserUser && order.purchaserUser.name}</td>
                <td>{moment(order.createdAt).format('l')}</td>
                <td>{order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    moment(order.paidAt).format('l')
                  ) : (
                    <i
                      className="fas fa-times danger"
                      style={{ color: 'red' }}
                    ></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    moment(order.deliveredAt).format('l')
                  ) : (
                    <i
                      className="fas fa-times danger"
                      style={{ color: 'red' }}
                    ></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/detail/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Detalles
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
