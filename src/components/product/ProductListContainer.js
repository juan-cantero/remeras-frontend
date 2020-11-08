import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../state/products/productListState';
import WithLoading from '../hoc/withLoading';
import ProductList from './ProductList';

const ProductListWithLoading = WithLoading(ProductList);

const ProductListContainer = () => {
  const { loading, error, products } = useSelector(
    // @ts-ignore
    (state) => state.productList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <ProductListWithLoading
      isLoading={loading}
      error={error}
      products={products}
    />
  );
};

export default ProductListContainer;
