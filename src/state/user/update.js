//constants

const { default: remerasApi } = require('../../api/remerasApi');

const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
const USER_UPDATE_FAILS = 'USER_UPDATE_FAILS';
const USER_UPDATE_CLEAR = 'USER_UPDATE_CLEAR';

//actions
export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    await remerasApi.put(`/user/${user.id}`, user, config);
    dispatch({ type: USER_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearUpdateUser = () => {
  return { type: USER_UPDATE_CLEAR };
};

const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case USER_UPDATE_FAILS:
      return { ...state, loading: false, error: action.payload };
    case USER_UPDATE_CLEAR:
      return {};
    default:
      return state;
  }
};

export default userUpdateReducer;
