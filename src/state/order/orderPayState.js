//const

const { default: remerasApi } = require('../../helpers/api/remerasApi');

const ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST';
const ORDER_PAY_SUCESS = 'ORDER_PAY_SUCESS';
const ORDER_PAY_FAILS = 'ORDER_PAY_FAILS';

//actions

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST });
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
    const { data } = await remerasApi.put(
      `orders/${id}/pay`,
      paymentResult,
      config
    );
    dispatch({ type: ORDER_PAY_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//reducer

const orderPayReducer = (
  state = { loading: true, success: false, error: null },
  action
) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };

    case ORDER_PAY_SUCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default orderPayReducer;
