// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.email, // mudar isso aqui depois
    };
  default:
    return state;
  }
}

export default userReducer;
