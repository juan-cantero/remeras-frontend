const { default: remerasApi } = require('../../api/remerasApi');

//const
const ORDERS_BY_USER_REQUEST = 'ORDERS_BY_USER_REQUEST';
const ORDERS_BY_USER_SUCCESS = 'ORDERS_BY_USER_SUCCESS';
const ORDERS_BY_USER_FAILS = 'ORDERS_BY_USER_FAILS';

//actions

export const getOrdersByUser = () => async (dispatch, getState) => {
  dispatch({ type: ORDERS_BY_USER_REQUEST });
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
    const { data } = await remerasApi.get('/orders/myorders', config);
    dispatch({ type: ORDERS_BY_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDERS_BY_USER_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//reducer
const initState = {
  loading: true,
  orders: [],
  error: null,
};
const ordersByUserReducer = (state = initState, action) => {
  switch (action.type) {
    case ORDERS_BY_USER_REQUEST:
      return { ...state, loading: true };

    case ORDERS_BY_USER_SUCCESS:
      return { ...state, loading: false, orders: action.payload };

    case ORDERS_BY_USER_FAILS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default ordersByUserReducer;
