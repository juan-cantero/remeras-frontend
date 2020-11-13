import Axios from 'axios';

const CART_ADD_ITEM = 'CART_ADD_ITEM';
const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
const CART_SAVE_SHIPPING_ADRESS = 'CART_SAVE_SHIPPING_ADRESS';
const CART_SAVE_PAYMENT_METHOD = 'CART_SAVE_PAYMENT_METHOD';

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

export const saveShippingAdress = (shippingAdressData) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADRESS, payload: shippingAdressData });
  localStorage.setItem('shippingAdress', JSON.stringify(shippingAdressData));
};

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: paymentMethod });
  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
};

//REDUCER

const cartReducer = (
  state = { cartItems: [], shippingAdress: {}, paymentMethod: '' },
  action
) => {
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
    case CART_SAVE_SHIPPING_ADRESS:
      return {
        ...state,
        shippingAdress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
