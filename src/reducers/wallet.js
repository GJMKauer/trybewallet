import {
  RECEIVE_CURRENCY, ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, FINISH_EDITING,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditingExpense: false,
  editingId: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_CURRENCY:
    return {
      ...state,
      currencies: Object.keys(action.currency)
        .filter((currency) => currency !== 'USDT'),
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.expenses,
        exchangeRates: action.currencies },
      ],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
      isEditingExpense: false,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      isEditingExpense: true,
      editingId: action.id,
    };
  case FINISH_EDITING:
    return {
      ...state,
      expenses: [...action.expenses],
      isEditingExpense: false,
      editingId: 0,
    };
  default:
    return state;
  }
}

export default walletReducer;
