const { default: remerasApi } = require('../../api/remerasApi');

const ORDER_DELIVER_REQUEST = 'ORDER_DELIVER_REQUEST';
const ORDER_DELIVER_SUCCESS = 'ORDER_DELIVER_SUCCESS';
const ORDER_DELIVER_FAILS = 'ORDER_DELIVER_FAILS';

export const markOrderAsDelivered = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST });
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
    await remerasApi.put(`/orders/${orderId}/delivered`, {}, config);
    dispatch({ type: ORDER_DELIVER_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const initState = {
  loading: false,
  success: false,
  error: null,
};
const orderDeliverReducer = (state = initState, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { ...state, loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { ...state, loading: false, success: true };
    case ORDER_DELIVER_FAILS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default orderDeliverReducer;
