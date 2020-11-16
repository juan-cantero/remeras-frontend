import Message from '../ui-layout/Message';

const IsDelivered = ({ isDelivered, deliveredAt }) => {
  return isDelivered ? (
    <Message variant="success">Pago el {deliveredAt}</Message>
  ) : (
    <Message variant="danger">Todavia no se hizo la entrega</Message>
  );
};

export default IsDelivered;
