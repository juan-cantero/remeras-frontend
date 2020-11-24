import remerasApi from '../../api/remerasApi.js';

//constants
const ORDER_DETAIL_REQUEST = 'ORDER_DETAIL_REQUEST';
const ORDER_DETAIL_SUCCESS = 'ORDER_DETAIL_SUCCESS';
const ORDER_DETAIL_FAILS = 'ORDER_DETAIL_FAILS';

//actions

export const getOrderDetail = (id) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAIL_REQUEST });
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
    const { data } = await remerasApi.get(`/orders/${id}`, config);
    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data });
    localStorage.setItem('orderDetail', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//reducer

const orderDetailReducer = (
  state = { loading: true, order: {}, error: null },
  action
) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return { ...state, loading: true };

    case ORDER_DETAIL_SUCCESS:
      return { ...state, loading: false, order: action.payload };

    case ORDER_DETAIL_FAILS:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default orderDetailReducer;
