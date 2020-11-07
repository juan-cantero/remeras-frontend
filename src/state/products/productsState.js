const { default: Axios } = require('axios');

//types
const PRODUCT_LIST_REQUEST = 'PRODUCT-LIST-REQUEST';
const PRODUCT_LIST_SUCCESS = 'PRODUCT-LIST-SUCCESS';
const PRODUCT_LIST_FAIL = 'PRODUCT-LIST-FAIL';

//action
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await Axios.get('http://localhost:5000/api/product');
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

//reducer
const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default productListReducer;
