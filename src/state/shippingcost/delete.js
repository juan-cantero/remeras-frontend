import remerasApi from '../../api/remerasApi';

const SHIPPINGCOST_DELETE_REQUEST = 'SHIPPINGCOST_DELETE_REQUEST';
const SHIPPINGCOST_DELETE_SUCCESS = 'SHIPPINGCOST_DELETE_SUCCESS';
const SHIPPINGCOST_DELETE_FAILS = 'SHIPPINGCOST_DELETE_FAILS';
const SHIPPINGCOST_DELETE_RESET = 'SHIPPINGCOST_DELETE_RESET';

//action
export const removeShippingCost = (id) => async (dispatch, getState) => {
  dispatch({ type: SHIPPINGCOST_DELETE_REQUEST });
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
    await remerasApi.delete(`/shippingcost/${id}`, config);
    dispatch({ type: SHIPPINGCOST_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: SHIPPINGCOST_DELETE_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeShippingCostReset = () => ({
  type: SHIPPINGCOST_DELETE_RESET,
});

//reducer
const initialState = { loading: false, success: false, error: null };
const shippingCostDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHIPPINGCOST_DELETE_REQUEST:
      return { ...state, loading: true };

    case SHIPPINGCOST_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };

    case SHIPPINGCOST_DELETE_FAILS:
      return { ...state, loading: false, error: action.payload };
    case SHIPPINGCOST_DELETE_RESET:
      return { ...state, loading: false, success: false };

    default:
      return state;
  }
};

export default shippingCostDeleteReducer;
