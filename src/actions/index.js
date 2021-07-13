// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
export const GET_COINS = 'GET_COINS';
export const SPEND_INFO = 'SPEND_INFO';
export const DELETE_SPEND = 'DELETE_SPEND';

export const setEmailStore = (email) => ({
  type: USER_EMAIL,
  email,
});

export const requestCoinsApi = (payload) => ({
  type: GET_COINS,
  payload,
});

export const spendInformation = (state) => ({
  type: SPEND_INFO,
  state,
});

export const actionDelete = (payload) => ({
  type: DELETE_SPEND,
  payload,
});

export function isFetching() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => dispatch(requestCoinsApi(currencies)));
}
