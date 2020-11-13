import React from 'react';

const ShippingItem = ({ shippingAddress }) => {
  const { address, city, locality, postalCode } = shippingAddress;
  return (
    <>
      <h2>Envio</h2>
      <p>
        <strong>Direccion: </strong>
        {address},{locality}, {city}, {postalCode}
      </p>
    </>
  );
};

export default ShippingItem;
