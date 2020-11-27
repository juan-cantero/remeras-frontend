import React from 'react';
import { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/ui-layout/Loader';
import Message from '../components/ui-layout/Message';
import {
  createShippingCost,
  createShippingCostReset,
} from '../state/shippingcost/actions';
import { removeShippingCost } from '../state/shippingcost/delete';
import { listShippingCost } from '../state/shippingcost/list';

const ShippingCostScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { error, loading, shippingCosts } = useSelector(
    (state) => state.shippingCostList
  );

  const {
    error: errorOnDelete,
    loading: loadingOnDelete,
    success,
  } = useSelector((state) => state.shippingCostDelete);

  const {
    error: errorOnCreate,
    loading: loadingOnCreate,
    createSuccess,
    createdShippingCost,
  } = useSelector((state) => state.shippingCostCreate);

  useEffect(() => {
    dispatch(createShippingCostReset());
    if (createSuccess) {
      history.push(`/admin/shippingcost/${createdShippingCost._id}/edit`);
    }
    dispatch(listShippingCost());
  }, [dispatch, success, createSuccess, history, createdShippingCost]);

  const handleShippingCostDeletion = (id) => {
    dispatch(removeShippingCost(id));
  };

  const handleCreateShippingCost = () => {
    dispatch(createShippingCost());
  };
  return (
    <>
      <Row className="aling-items-center">
        <Col>
          <h1>Precios de envios</h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3" onClick={handleCreateShippingCost}>
            <i className="fas fa-plus"></i> Crear nuevo costo de envio
          </Button>
        </Col>
      </Row>
      {loadingOnDelete && <Loader />}
      {errorOnDelete && <Message variant="danger">{errorOnDelete}</Message>}
      {loadingOnCreate && <Loader />}
      {errorOnCreate && <Message variant="danger">{errorOnCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Pais</th>
              <th>Provincia</th>
              <th>Localidad</th>
              <th>Codigo postal</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shippingCosts.map((shippingCost) => (
              <tr key={shippingCost._id}>
                <td>{shippingCost._id}</td>
                <td>{shippingCost.country}</td>
                <td>{shippingCost.province}</td>
                <td>{shippingCost.locality}</td>
                <td>{shippingCost.postalCode}</td>
                <td>{shippingCost.price}</td>

                <td>
                  <LinkContainer
                    to={`/admin/shippingcost/${shippingCost._id}/edit`}
                  >
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      handleShippingCostDeletion(shippingCost._id);
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

export default ShippingCostScreen;
