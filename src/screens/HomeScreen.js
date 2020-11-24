import React from 'react';
import Gallery from '../components/gallery/Gallery';
import Meta from '../components/meta/Meta';
import ProductListContainer from '../components/product/ProductListContainer';
import Whatapps from '../components/whatsapp/Whatapps';

const HomeScreen = () => {
  return (
    <>
      <Meta />
      <ProductListContainer />
      <Whatapps phoneNumber={5491153451277} />
    </>
  );
};

export default HomeScreen;
