const { default: remerasApi } = require('../../helpers/api/remerasApi');

//consts
const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST';
const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';
const USER_DELETE_FAILS = 'USER_DELETE_FAILS';

//actions

export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST });

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
    await remerasApi.delete(`user/${id}`, config);
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userDeleteReducer;
