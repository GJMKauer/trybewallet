// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ALGO AQUI': // mudar isso aqui depois
    return {
      ...state,
      currencies: [action.currencies], // mudar isso aqui depois
      expenses: [action.expenses], // mudar isso aqui depois
    };
  default:
    return state;
  }
}

export default walletReducer;
