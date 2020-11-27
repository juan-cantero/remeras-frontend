import remerasApi from '../../api/remerasApi';

const SHIPPINGCOST_GET_REQUEST = 'SHIPPINGCOST_GET_REQUEST';
const SHIPPINGCOST_GET_SUCCESS = 'SHIPPINGCOST_GET_SUCCESS';
const SHIPPINGCOST_GET_FAILS = 'SHIPPINGCOST_GET_FAILS';

export const getShippingCost = (id) => async (dispatch, getState) => {
  dispatch({ type: SHIPPINGCOST_GET_REQUEST });
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
    const { data } = await remerasApi.get(`/shippingcost/${id}`, config);
    dispatch({ type: SHIPPINGCOST_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHIPPINGCOST_GET_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const initialState = {
  shippingCostDetail: null,
  loading: false,
  error: null,
};

const shippingCostGetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHIPPINGCOST_GET_REQUEST:
      return { ...state, loading: true };
    case SHIPPINGCOST_GET_SUCCESS:
      return { ...state, loading: false, shippingCostDetail: action.payload };

    case SHIPPINGCOST_GET_FAILS:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default shippingCostGetReducer;
