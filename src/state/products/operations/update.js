import remerasApi from '../../../helpers/api/remerasApi';
const PRODUCT_UPDATE_REQUEST = 'PRODUCT_UPDATE_REQUEST';
const PRODUCT_UPDATE_SUCCESS = 'PRODUCT_UPDATE_SUCCESS';
const PRODUCT_UPDATE_FAILS = 'PRODUCT_UPDATE_FAILS';
const PRODUCT_UPDATE_RESET = 'PRODUCT_UPDATE_RESET';

export const updateProduct = (id, productInfo) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST });

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
    await remerasApi.put(`/product/${id}`, productInfo, config);
    dispatch({ type: PRODUCT_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productUpdateReset = () => ({ type: PRODUCT_UPDATE_RESET });

//reducer

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const productUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { ...state, success: true, loading: false };
    case PRODUCT_UPDATE_FAILS:
      return { ...state, error: action.payload, loading: false };
    case PRODUCT_UPDATE_RESET:
      return { ...state, success: false, loading: false, error: null };

    default:
      return state;
  }
};

export default productUpdateReducer;
