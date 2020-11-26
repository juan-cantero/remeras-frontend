import { remerasApiCache } from '../../../api/remerasApi';

//types
const PRODUCT_LIST_REQUEST = 'PRODUCT-LIST-REQUEST';
const PRODUCT_LIST_SUCCESS = 'PRODUCT-LIST-SUCCESS';
const PRODUCT_LIST_FAIL = 'PRODUCT-LIST-FAIL';

const PRODUCT_LIST_BY_GENRE_REQUEST = 'PRODUCT-LIST-BY-GENRE-REQUEST';
const PRODUCT_LIST_BY_GENRE_SUCCESS = 'PRODUCT-LIST-BY-GENRE-SUCCESS';
const PRODUCT_LIST_BY_GENRE_FAIL = 'PRODUCT-LIST-BY-GENRE-FAIL';

//action
export const listProducts = (keyword = '', page = '') => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await remerasApiCache.get(
      `/product/list?keyword=${keyword}&page=${page}`,
      {
        cache: userInfo !== null ? !userInfo.isAdmin : true,
      }
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductsByGenre = (genre, page = '') => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_LIST_BY_GENRE_REQUEST });
    const { data } = await remerasApiCache.get(
      `/product/list/${genre}?page=${page}`
    );
    dispatch({ type: PRODUCT_LIST_BY_GENRE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BY_GENRE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//reducer
const initialState = {
  products: [],
  pages: null,
  page: null,

  loading: false,
  error: null,
};

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_BY_GENRE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
        loading: false,
      };
    case PRODUCT_LIST_BY_GENRE_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
        loading: false,
      };

    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_LIST_BY_GENRE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default productListReducer;
