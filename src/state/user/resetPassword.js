import remerasApi from '../../api/remerasApi';

const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAILS = 'RESET_PASSWORD_FAILS';

export const resetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    await remerasApi.put('/user/forgotpassword', { email });

    dispatch({ type: RESET_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//reducer
const initState = {
  loading: false,
  error: null,
  success: false,
};
const resetPasswordReducer = (state = initState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: true };
    case RESET_PASSWORD_FAILS:
      return { ...state, loading: false, errror: action.payload };
    default:
      return state;
  }
};

export default resetPasswordReducer;
