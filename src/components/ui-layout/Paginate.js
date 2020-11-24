import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { v4 as uuiu } from 'uuid';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((p) => {
          let where;
          if (isAdmin) {
            where = `/admin/productlist/${p + 1}`;
          } else {
            if (keyword) {
              where = `/search/${keyword}/page/${p + 1}`;
            } else {
              where = `/page/${p + 1}`;
            }
          }
          return (
            <LinkContainer key={uuiu()} to={where}>
              <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
};

export default Paginate;
