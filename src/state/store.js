import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import productListReducer from './products/productListState';
import productDetailReducer from './products/productState';
import cartReducer from './cart/cartState';
import userLoginReducer from './user/userLoginState';
import userRegisterReducer from './user/userRegisterState';
import userDetailsReducer from './user/userProfileState';
import userUpdateProfileReducer from './user/userUpdateProfileState';
import orderCreateReducer from './order/orderCreateState';
import orderDetailReducer from './order/orderDetailState';
import orderPayReducer from './order/orderPayState';
import mercadoPagoPayReducer from './mercadopago/mercadoPagoState';
import ordersByUserReducer from './order/ordersByUserState';
import userListReducer from './user/userListState';

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  orderCreate: orderCreateReducer,
  orderDetail: orderDetailReducer,
  orderPay: orderPayReducer,
  myOrders: ordersByUserReducer,
  mercadoPagoPay: mercadoPagoPayReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
