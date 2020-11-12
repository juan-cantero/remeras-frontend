const { default: Axios } = require('axios');

const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
const USER_REGISTER_FAILS = 'USER_REGISTER_FAILS';
const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';

// Action

export const register = (name, email, password) => async (
  dispatch,
  getState
) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const { data } = await Axios.post(
      'http://localhost:5000/api/user/',
      { name, email, password },
      {
        headers: { 'CONTENT-TYPE': 'application/json' },
      }
    );
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

//reducer

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userRegisterReducer;
