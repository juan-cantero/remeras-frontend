import Axios from 'axios';

const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST';
const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS';
const USER_DETAILS_FAILS = 'USER_DETAILS_FAILS';

//action

export const getUserDetails = () => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'CONTENT-TYPE': 'application/json',
        AUTHORIZATION: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await Axios.get(
      `http://192.168.0.104:5000/api/user/profile`,
      config
    );
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//reducer
const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, userProfile: action.payload };
    case USER_DETAILS_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userDetailsReducer;
