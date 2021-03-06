import { useHistory } from 'react-router-dom';
import remerasApi from '../../helpers/api/remerasApi';

const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
const USER_LOGIN_FAILS = 'USER_LOGIN_FAILS';
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const USER_LOGOUT = 'USER_LOGOUT';

// action

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await remerasApi.post('user/login', { email, password });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
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

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};
const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_LOGIN_FAILS:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return { ...state, loading: false, userInfo: null, error: null };
    default:
      return state;
  }
};

export default userLoginReducer;
