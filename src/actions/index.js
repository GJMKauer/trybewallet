export const USER_EMAIL = 'USER_EMAIL';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';
export const FINISH_EXPENSE = 'FINISH_EXPENSE';

export const userEmailAction = (email) => ({
  type: USER_EMAIL,
  email,
});

const receiveCurrency = (currency) => ({
  type: RECEIVE_CURRENCY,
  currency,
});

export function fetchCurrencies() {
  const FETCH_URL = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    const response = await fetch(FETCH_URL);
    const data = await response.json();
    return dispatch(receiveCurrency(data));
  };
}

const finishExpense = (expenses, currencies) => ({
  type: FINISH_EXPENSE,
  expenses,
  currencies,
});

export function fetchExpensesCoin(expenses) {
  const FETCH_URL = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    const response = await fetch(FETCH_URL);
    const data = await response.json();
    return dispatch(finishExpense(expenses, data));
  };
}
