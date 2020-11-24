const { default: remerasApi } = require('../../api/remerasApi');

//consts
const USER_GET_REQUEST = 'USER_GET_REQUEST';
const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
const USER_GET_FAILS = 'USER_GET_FAILS';

export const getUser = (id) => async (dispatch, getState) => {
  dispatch({ type: USER_GET_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await remerasApi.get(`/user/${id}`, config);
    dispatch({ type: USER_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_GET_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const initState = { loading: true, user: {}, error: null };
const userGetReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_GET_REQUEST:
      return { ...state, loading: true };
    case USER_GET_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case USER_GET_FAILS:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userGetReducer;
