import React from 'react';

const ShippingItem = ({ shippingAdress }) => {
  const { address, city, locality, postalCode } = shippingAdress;
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
