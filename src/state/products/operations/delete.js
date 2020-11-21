const { default: remerasApi } = require('../../../helpers/api/remerasApi');

const PRODUCT_DELETE_REQUEST = 'PRODUCT_DELETE_REQUEST';
const PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS';
const PRODUCT_DELETE_FAILS = 'PRODUCT_DELETE_FAILS';

export const deleteProduct = (id, creatorId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST });

  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    await remerasApi.delete(`product/${id}`, config);
    await remerasApi.delete(`s3/${creatorId}/${id}`, config);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productDeleteReducer;
