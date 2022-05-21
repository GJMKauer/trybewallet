export const USER_EMAIL = 'USER_EMAIL';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const FINISH_EDITING = 'FINISH_EDITING';

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
  type: ADD_EXPENSE,
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

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

export const editExpenseAction = (id) => ({
  type: EDIT_EXPENSE,
  id,
});

export const finishEdit = (expenses) => ({
  type: FINISH_EDITING,
  expenses,
});
