import React from 'react';

const Price = ({ text, currencySymbol, price }) => {
  return <strong>{`${text} ${currencySymbol} ${price}`}</strong>;
};

Price.defaultProps = {
  text: 'Precio:',
  currencySymbol: '$',
};

export default Price;
