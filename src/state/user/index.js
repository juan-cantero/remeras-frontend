import userListReducer from './list';
import userDeleteReducer from './delete';
import userGetReducer from './get';
import userLoginReducer from './login';
import userRegisterReducer from './register';
import userDetailsReducer from './details';
import userUpdateProfileReducer from './updateProfile';
import { getUserList } from './list';
import { deleteUser } from './delete';
import { getUser } from './get';
import { login, logOut } from './login';
import { register, clearUserInfoInLogOut } from './register';
import { getUserDetails } from './details';
import { updateProfile } from './updateProfile';

//reducers
export {
  userListReducer,
  userDeleteReducer,
  userGetReducer,
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
};

//actions
export {
  getUser,
  deleteUser,
  login,
  logOut,
  register,
  clearUserInfoInLogOut,
  getUserDetails,
  getUserList,
  updateProfile,
};
