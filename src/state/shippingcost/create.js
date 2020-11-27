const { default: remerasApi } = require('../../api/remerasApi');

const SHIPPINGCOST_CREATE_REQUEST = 'SHIPPINGCOST_CREATE_REQUEST';
const SHIPPINGCOST_CREATE_SUCCESS = 'SHIPPINGCOST_CREATE_SUCCESS';
const SHIPPINGCOST_CREATE_FAILS = 'SHIPPINGCOST_CREATE_FAILS';
const SHIPPINGCOST_CREATE_RESET = 'SHIPPINGCOST_CREATE_RESET';

//actions

export const createShippingCost = () => async (dispatch, getState) => {
  dispatch({ type: SHIPPINGCOST_CREATE_REQUEST });

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
    const { data } = await remerasApi.post('/shippingcost', {}, config);
    dispatch({ type: SHIPPINGCOST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHIPPINGCOST_CREATE_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createShippingCostReset = () => {
  return { type: SHIPPINGCOST_CREATE_RESET };
};

//reducer

const initialState = {
  createdShippingCost: null,
  createSuccess: false,
  loading: false,
  error: null,
};

const shippingCostCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHIPPINGCOST_CREATE_REQUEST:
      return { ...state, loading: true };
    case SHIPPINGCOST_CREATE_SUCCESS:
      return {
        ...state,
        createdShippingCost: action.payload,
        createSuccess: true,
        loading: false,
      };
    case SHIPPINGCOST_CREATE_FAILS:
      return { ...state, error: action.payload, loading: false };
    case SHIPPINGCOST_CREATE_RESET:
      return {
        ...state,
        createdShippingCost: null,
        loading: false,
        error: null,
        createSuccess: false,
      };

    default:
      return state;
  }
};

export default shippingCostCreateReducer;
