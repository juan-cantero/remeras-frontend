import remerasApi from '../../api/remerasApi.js';

const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST';
const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS';
const ORDER_CREATE_FAILS = 'ORDER_CREATE_FAILS';
const ORDER_CREATE_RESET = 'ORDER_CREATE_RESET';

//actions
export const createOrder = (orderData) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
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
    const { data } = await remerasApi.post('/orders', orderData, config);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetOrder = () => ({ type: ORDER_CREATE_RESET });

//reducer
const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        success: true,
      };
    case ORDER_CREATE_FAILS:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export default orderCreateReducer;
