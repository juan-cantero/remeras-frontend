const { default: remerasApi } = require('../../helpers/api/remerasApi');

//const
const MERCADOPAGO_PAY_REQUEST = 'MERCADOPAGO_PAY_REQUEST';
const MERCADOPAGO_PAY_SUCCESS = 'MERCADOPAGO_PAY_SUCCESS';
const MERCADOPAGO_PAY_FAILS = 'MERCADOPAGO_PAY_FAILS';

//actions

export const payMercadoLibre = (items, external_reference) => async (
  dispatch,
  getState
) => {
  dispatch({ type: MERCADOPAGO_PAY_REQUEST });
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
    const { data } = await remerasApi.post(
      '/mercadopago',
      {
        external_reference: external_reference,
        items: items,
      },
      config
    );
    dispatch({ type: MERCADOPAGO_PAY_SUCCESS, payload: data.body.init_point });
  } catch (error) {
    dispatch({
      type: MERCADOPAGO_PAY_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//REDUCER

const mercadoPagoPayReducer = (
  state = { loading: true, init_point: '', error: null },
  action
) => {
  switch (action.type) {
    case MERCADOPAGO_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MERCADOPAGO_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        init_point: action.payload,
      };
    case MERCADOPAGO_PAY_FAILS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default mercadoPagoPayReducer;
