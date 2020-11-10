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
    name: `${data.product.name}-${size}`,
    quantity: quantity,
    size: size,
    image: data.product.image,
    price: data.product.price,
    stock: data.product.stock,
  };
  dispatch({
    type: CART_ADD_ITEM,
    payload: product,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id, size) => (dispatch, getState) => {
  const product = { id: id, size: size };
  dispatch({ type: CART_REMOVE_ITEM, payload: product });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

//REDUCER

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const product = action.payload;
      const existProduct = state.cartItems.find(
        (p) => p.id === product.id && p.size === product.size
      );
      if (existProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((p) => {
            if (p.id === existProduct.id && p.size === existProduct.size) {
              return product;
            }
            return p;
          }),
        };
      }

      return { ...state, cartItems: [...state.cartItems, product] };

    case CART_REMOVE_ITEM:
      const item = action.payload;

      return {
        ...state,
        cartItems: state.cartItems.filter(
          (p) => p.id !== item.id || p.size !== item.size
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
