const { default: remerasApi } = require('../../api/remerasApi');

const SHIPPINGCOST_LIST_REQUEST = 'LIST_SHIPPINGCOST_REQUEST';
const SHIPPINGCOST_LIST_SUCCESS = 'LIST_SHIPPINGCOST_SUCCESS';
const SHIPPINGCOST_LIST_FAILS = 'LIST_SHIPPINGCOST_FAILS';

// actions

export const listShippingCost = () => async (dispatch) => {
  dispatch({ type: SHIPPINGCOST_LIST_REQUEST });
  try {
    const { data } = await remerasApi.get('/shippingcost/list');
    dispatch({ type: SHIPPINGCOST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHIPPINGCOST_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//reducer
const initState = {
  shippingCosts: [],
  loading: false,
  error: null,
};
const shippingCostListReducer = (state = initState, action) => {
  switch (action.type) {
    case SHIPPINGCOST_LIST_REQUEST:
      return { ...state, loading: true };
    case SHIPPINGCOST_LIST_SUCCESS:
      return { ...state, loading: false, shippingCosts: action.payload };
    case SHIPPINGCOST_LIST_FAILS:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default shippingCostListReducer;
