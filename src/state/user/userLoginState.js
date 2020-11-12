import Axios from 'axios';

const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
const USER_LOGIN_FAILS = 'USER_LOGIN_FAILS';
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const USER_LOGOUT = 'USER_LOGOUT';

// action

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await Axios.post(
      'http://localhost:5000/api/user/login',
      { email, password },
      {
        headers: { 'CONTENT-TYPE': 'application/json' },
      }
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userData', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logOut = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

//REDUCER

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAILS:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userLoginReducer;
