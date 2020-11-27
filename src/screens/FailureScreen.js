import React from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FailureScreen = () => {
  return (
    <Alert className="text-center" variant="danger">
      <Alert.Heading>Lo sentimos algo salio mal con el pago</Alert.Heading>
      <p>
        No se olvide que puede terminar su compra directamente hablando con
        nosotros por whatsapp.
        <a
          rel="noreferrer"
          target="_blank"
          href={`https://api.whatsapp.com/send?phone=${5491153451277}`}
        >
          <div className="Whatsapp-button" />
        </a>
      </p>
      <hr />
      <div className="d-flex justify-content-end">
        <Link to="/">Seguir viendo el catálogo</Link>
      </div>
    </Alert>
  );
};

export default FailureScreen;
