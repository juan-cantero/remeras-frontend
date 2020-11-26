const { default: remerasApi } = require('../../api/remerasApi');

const ORDER_LIST_REQUEST = 'ORDER_LIST_REQUEST';
const ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS';
const ORDER_LIST_FAILS = 'ORDER_LIST_FAILS';

export const listOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      cache: false,
    },
  };

  try {
    const { data } = await remerasApi.get('/orders', config);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const initState = {
  orderList: [],
  loading: false,
  error: null,
};

const orderListReducer = (state = initState, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_SUCCESS:
      return { ...state, loading: false, orderList: action.payload };
    case ORDER_LIST_FAILS:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default orderListReducer;
