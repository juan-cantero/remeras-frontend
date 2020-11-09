import Axios from 'axios';

const CART_ADD_ITEM = 'CART_ADD_ITEM';
const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';

//ACTIONS

export const addToCart = (id, quantity, size) => async (dispatch, getState) => {
  const { data } = await Axios.get(
    `http://192.168.0.104:5000/api/product/${id}`
  );
  const product = {
    id: id,
    name: data.product.name,
    quantity: quantity,
    size: size,
    image: data.product.image,
    price: data.product.price,
  };
  dispatch({
    type: CART_ADD_ITEM,
    payload: product,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

//REDUCER

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const product = action.payload;
      const existProduct = state.cartItems.find((p) => p.id === product.id);
      if (existProduct) {
        product.quantity = product.quantity + 1;
        return {
          ...state,
          cartItems: state.cartItems.map((p) =>
            p.id === existProduct.id ? product : p
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, product],
      };
    case CART_REMOVE_ITEM:
      return state;
    default:
      return state;
  }
};

export default cartReducer;
