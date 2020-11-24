import remerasApi from '../../api/remerasApi.js';
//consts
const USER_LIST_REQUEST = 'USER_LIST_REQUEST';
const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS';
const USER_LIST_FAILS = 'USER_LIST_FAILS';

//actions

export const getUserList = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
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
    const { data } = await remerasApi.get('/user/list', config);
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const initState = {
  loading: true,
  userList: [],
  error: '',
};
const userListReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true };
    case USER_LIST_SUCCESS:
      return { ...state, loading: false, userList: action.payload };
    case USER_LIST_FAILS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userListReducer;
