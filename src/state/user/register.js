import remerasApi from '../../helpers/api/remerasApi';

const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
const USER_REGISTER_FAILS = 'USER_REGISTER_FAILS';
const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
const USER_CLEAN_INFO_IN_LOGOUT = 'USER_CLEAN_INFO_IN_LOGOUT';

// Action

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const { data } = await remerasApi.post('user', { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const clearUserInfoInLogOut = () => (dispatch) => {
  dispatch({ type: USER_CLEAN_INFO_IN_LOGOUT });
};
//reducer

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        registerSuccess: true,
      };
    case USER_REGISTER_FAILS:
      return { loading: false, error: action.payload };
    case USER_CLEAN_INFO_IN_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userRegisterReducer;
