import React from 'react';
import ProductListContainer from '../components/product/ProductListContainer';
import Whatapps from '../components/whatsapp/Whatapps';

const HomeScreen = () => {
  return (
    <>
      <h1 className="text-center">Remeras Nuevas</h1>
      <ProductListContainer />
      <Whatapps phoneNumber={5491153451277} />
    </>
  );
};

export default HomeScreen;
