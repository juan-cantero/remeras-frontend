import Axios from 'axios';

const USER_UPDATE_PROFILE_REQUEST = 'USER_UPDATE_PROFILE_REQUEST';
const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS';
const USER_UPDATE_PROFILE_FAILS = 'USER_UPDATE_PROFILE_FAILS';

//ACTION

export const updateProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      'CONTENT-TYPE': 'application/json',
      AUTHORIZATION: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await Axios.put(
      'http://192.168.0.104:5000/api/user/profile',
      user,
      config
    );
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//REDUCER

const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        userProfileUpdated: action.payload,
      };
    case USER_UPDATE_PROFILE_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userUpdateProfileReducer;
