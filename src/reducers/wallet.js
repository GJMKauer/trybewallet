import { RECEIVE_CURRENCY } from '../actions';

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
  case 'ALGO AQUI':
    return {
      ...state,
      expenses: [action.expenses], // mudar isso aqui depois
    };
  default:
    return state;
  }
}

export default walletReducer;
