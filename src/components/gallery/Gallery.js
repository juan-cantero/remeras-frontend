import React, { useEffect, useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';
import { useSelector } from 'react-redux';
import Loader from '../ui-layout/Loader';
import Message from '../ui-layout/Message';
import 'react-bnb-gallery/dist/style.css';

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  const { loading, error, products } = useSelector(
    // @ts-ignore
    (state) => state.productList
  );

  useEffect(() => {
    if (products) {
      setPhotos(
        products.map((p) => ({
          photo: `https://r-emeras-aws-bucket.s3-sa-east-1.amazonaws.com/${p.image}`,
          caption: p.name,
        }))
      );
    }
  }, [products]);

  return loading ? null : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <div className="Gallery" onClick={() => setIsOpen(true)}>
        <i className="fas fa-tshirt fa-3x text-secondary"></i>
      </div>
      <ReactBnbGallery
        show={isOpen}
        photos={photos}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Gallery;
