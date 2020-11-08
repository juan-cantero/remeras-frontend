const { default: Axios } = require('axios');

//types
const PRODUCT_DETAIL_REQUEST = 'PRODUCT_DETAIL-REQUEST';
const PRODUCT_DETAIL_SUCCESS = 'PRODUCT_DETAIL-SUCCESS';
const PRODUCT_DETAIL_FAIL = 'PRODUCT_DETAIL-FAIL';

//actions

export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const { data } = await Axios.get(`http://localhost:5000/api/product/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//reducer

const initialState = {
  product: null,
  loading: false,
  error: null,
};

const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAIL_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default productDetailReducer;
