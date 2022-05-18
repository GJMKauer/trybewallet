export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';

export const userEmailAction = (email) => ({
  type: USER_EMAIL,
  email,
});

const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

const receiveCurrency = (currency) => ({
  type: RECEIVE_CURRENCY,
  currency,
});

export function fetchCurrencies() {
  const FETCH_URL = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    dispatch(requestCurrency());
    return fetch(FETCH_URL)
      .then((response) => response.json())
      .then((currency) => dispatch(receiveCurrency(currency)));
  };
}
