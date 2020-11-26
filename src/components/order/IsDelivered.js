import Message from '../ui-layout/Message';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

const IsDelivered = ({ isDelivered, deliveredAt }) => {
  return isDelivered ? (
    <Message variant="success">
      Fue enviado el dia {moment(deliveredAt).format('l')}
    </Message>
  ) : (
    <Message variant="danger">Todavia no se hizo la entrega</Message>
  );
};

export default IsDelivered;
