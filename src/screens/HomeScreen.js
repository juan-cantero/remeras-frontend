import React from 'react';
import Meta from '../components/meta/Meta';
import ProductListContainer from '../components/product/ProductListContainer';
import Whatapps from '../components/whatsapp/Whatapps';

const HomeScreen = () => {
  return (
    <>
      <Meta />
      <h1 className="text-center">Remeras Nuevas</h1>
      <ProductListContainer />
      <Whatapps phoneNumber={5491153451277} />
    </>
  );
};

export default HomeScreen;
