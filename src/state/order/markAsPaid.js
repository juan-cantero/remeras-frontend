import remerasApi from '../../api/remerasApi';

const ORDER_MARKASPAID_REQUEST = 'ORDER_MARKASPAID_REQUEST';
const ORDER_MARKASPAID_SUCCESS = 'ORDER_MARKASPAID_SUCCESS';
const ORDER_MARKASPAID_FAILS = 'ORDER_MARKASPAID_FAILS';

export const markOrderAsPaid = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_MARKASPAID_REQUEST });
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
    await remerasApi.put(`/orders/${orderId}/pay`, {}, config);
    dispatch({ type: ORDER_MARKASPAID_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_MARKASPAID_FAILS,
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
const orderMarkAsPaidReducer = (state = initState, action) => {
  switch (action.type) {
    case ORDER_MARKASPAID_REQUEST:
      return { ...state, loading: true };
    case ORDER_MARKASPAID_SUCCESS:
      return { ...state, loading: false, success: true };
    case ORDER_MARKASPAID_FAILS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default orderMarkAsPaidReducer;
