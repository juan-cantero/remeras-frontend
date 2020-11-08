import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import productListReducer from './products/productListState';
import productDetailReducer from './products/productState';

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
});
const initialState = {};
const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
