import { RECEIVE_CURRENCY, FINISH_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_CURRENCY:
    return {
      ...state,
      currencies: Object.keys(action.currency)
        .filter((currency) => currency !== 'USDT'),
    };
  case FINISH_EXPENSE: {
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.expenses,
        exchangeRates: action.currencies },
      ],
    };
  }
  default:
    return state;
  }
}

export default walletReducer;
