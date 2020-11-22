import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import cartReducer from './cart/cartState';
import {
  orderCreateReducer,
  orderDetailReducer,
  orderPayReducer,
  ordersByUserReducer,
  orderListReducer,
  orderDeliverReducer,
} from './order/reducers';
import mercadoPagoPayReducer from './mercadopago/mercadoPagoState';

import {
  userDeleteReducer,
  userDetailsReducer,
  userGetReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './user/reducers';
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailReducer,
  productListReducer,
  productUpdateReducer,
} from './products/reducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  user: userGetReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
  orderCreate: orderCreateReducer,
  orderDetail: orderDetailReducer,
  orderList: orderListReducer,
  orderPay: orderPayReducer,
  myOrders: ordersByUserReducer,
  orderDeliver: orderDeliverReducer,
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
