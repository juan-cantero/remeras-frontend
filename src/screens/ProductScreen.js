import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import WithLoading from '../components/hoc/withLoading';
import Meta from '../components/meta/Meta';
import ProductDetail from '../components/product/ProductDetail';
import { getProductDetail } from '../state/products/actions';
const ProductDetailWithLoading = WithLoading(ProductDetail);

const ProductScreen = ({ match }) => {
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail(match.params.id));
  }, [dispatch, match]);

  if (!product) return null;
  return (
    <>
      <Meta title={product.name} />
      <ProductDetailWithLoading
        isLoading={loading}
        error={error}
        product={product}
      />
    </>
  );
};

export default ProductScreen;
