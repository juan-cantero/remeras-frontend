import React from 'react';
import ProductListContainer from '../components/product/ProductListContainer';

const HomeScreen = () => {
  return (
    <>
      <h1 className="text-center">Remeras Nuevas</h1>
      <ProductListContainer />
    </>
  );
};

export default HomeScreen;
