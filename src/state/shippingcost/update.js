import remerasApi from '../../api/remerasApi';

const SHIPPINGCOST_UPDATE_REQUEST = 'SHIPPINGCOST_UPDATE_REQUEST';
const SHIPPINGCOST_UPDATE_SUCCESS = 'SHIPPINGCOST_UPDATE_SUCCESS';
const SHIPPINGCOST_UPDATE_FAILS = 'SHIPPINGCOST_UPDATE_FAILS';
const SHIPPINGCOST_UPDATE_RESET = 'SHIPPINGCOST_UPDATE_RESET';

//actions

export const updateShippingCost = (id, shippingCostInfo) => async (
  dispatch,
  getState
) => {
  dispatch({ type: SHIPPINGCOST_UPDATE_REQUEST });

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
      `/shippingcost/${id}`,
      shippingCostInfo,
      config
    );
    dispatch({ type: SHIPPINGCOST_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHIPPINGCOST_UPDATE_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const shippingCostUpdateReset = () => ({
  type: SHIPPINGCOST_UPDATE_RESET,
});

//reducer

const initialState = {
  updatedShippingCost: null,
  updateSuccess: false,
  loading: false,
  error: null,
};

const shippingCostUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHIPPINGCOST_UPDATE_REQUEST:
      return { ...state, loading: true };
    case SHIPPINGCOST_UPDATE_SUCCESS:
      return {
        ...state,
        updatedShippingCost: action.payload,
        updatedSuccess: true,
        loading: false,
      };
    case SHIPPINGCOST_UPDATE_FAILS:
      return { ...state, error: action.payload, loading: false };
    case SHIPPINGCOST_UPDATE_RESET:
      return {
        ...state,
        updatedShippingCost: null,
        loading: false,
        error: null,
        updatedSuccess: false,
      };

    default:
      return state;
  }
};

export default shippingCostUpdateReducer;
