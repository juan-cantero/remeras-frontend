import React, { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import WithLoading from '../components/hoc/withLoading';
import { listProductsByGenre } from '../state/products/actions';
import { v4 as uuiu } from 'uuid';
import ProductList from '../components/product/ProductList';

const ProductListWithLoading = WithLoading(ProductList);

const FilteredByGenreScreen = () => {
  const { loading, error, products, pages, page } = useSelector(
    // @ts-ignore
    (state) => state.productList
  );
  const { genre, page: pageNumber = 1 } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductsByGenre(genre, pageNumber));
  }, [dispatch, pageNumber, genre]);

  return (
    <>
      <ProductListWithLoading
        isLoading={loading}
        error={error}
        products={products}
      />
      {pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((p) => {
            return (
              <LinkContainer key={uuiu()} to={`/genre/${genre}/page/${p + 1}`}>
                <Pagination.Item active={p + 1 === page}>
                  {p + 1}
                </Pagination.Item>
              </LinkContainer>
            );
          })}
        </Pagination>
      )}
    </>
  );
};

export default FilteredByGenreScreen;
