const { default: remerasApi } = require('../../api/remerasApi');

const SET_NEWPASSWORD_REQUEST = 'SET_NEWPASSWORD_REQUEST';
const SET_NEWPASSWORD_SUCCESS = 'SET_NEWPASSWORD_SUCCESS';
const SET_NEWPASSWORD_FAILS = 'SET_NEWPASSWORD_FAILS';

export const setNewPassword = (newPassword, resetLink) => async (dispatch) => {
  dispatch({ type: SET_NEWPASSWORD_REQUEST });

  try {
    await remerasApi.put(`/user/resetpassword`, { newPassword, resetLink });
    dispatch({ type: SET_NEWPASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: SET_NEWPASSWORD_FAILS,
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

const setNewPasswordReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_NEWPASSWORD_REQUEST:
      return { ...state, loading: true };
    case SET_NEWPASSWORD_SUCCESS:
      return { ...state, loading: false, success: true };
    case SET_NEWPASSWORD_FAILS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default setNewPasswordReducer;
