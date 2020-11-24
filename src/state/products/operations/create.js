import remerasApi from '../../../api/remerasApi';
const PRODUCT_CREATE_REQUEST = 'PRODUCT_CREATE_REQUEST';
const PRODUCT_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS';
const PRODUCT_CREATE_FAILS = 'PRODUCT_CREATE_FAILS';
const PRODUCT_CREATE_RESET = 'PRODUCT_CREATE_RESET';

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });

  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await remerasApi.post('/product', {}, config);
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReset = () => {
  return { type: PRODUCT_CREATE_RESET };
};

//reducer

const initialState = {
  createdProduct: null,
  createSuccess: false,
  loading: false,
  error: null,
};

const productCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        createdProduct: action.payload,
        createSuccess: true,
        loading: false,
      };
    case PRODUCT_CREATE_FAILS:
      return { ...state, error: action.payload, loading: false };
    case PRODUCT_CREATE_RESET:
      return {
        ...state,
        createdProduct: null,
        loading: false,
        error: null,
        createSuccess: false,
      };

    default:
      return state;
  }
};

export default productCreateReducer;
