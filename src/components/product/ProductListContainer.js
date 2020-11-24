import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProducts } from '../../state/products/actions';
import WithLoading from '../hoc/withLoading';
import Paginate from '../ui-layout/Paginate';
import ProductList from './ProductList';

const ProductListWithLoading = WithLoading(ProductList);

const ProductListContainer = () => {
  const { loading, error, products, pages, page } = useSelector(
    // @ts-ignore
    (state) => state.productList
  );
  const { keyword, page: pageNumber = 1 } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <ProductListWithLoading
        isLoading={loading}
        error={error}
        products={products}
      />
      <Paginate pages={pages} page={page} keyword={keyword} />
    </>
  );
};

export default ProductListContainer;
