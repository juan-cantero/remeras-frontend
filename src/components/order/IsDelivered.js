import Message from '../ui-layout/Message';

const IsDelivered = ({ isDelivered, deliveredAt }) => {
  return isDelivered ? (
    <Message variant="success">
      Fue enviado el dia {deliveredAt.substring(0, 10)}
    </Message>
  ) : (
    <Message variant="danger">Todavia no se hizo la entrega</Message>
  );
};

export default IsDelivered;
