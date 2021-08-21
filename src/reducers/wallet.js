import {
  SAVE_EXPENSE_WALLET,
  DELETE_EXPENSE_WALLET,
  OPEN_EDIT_EXPENSE,
  SAVE_EDITED_EXPENSES,
  SAVE_CURRENCYES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  idEdit: '',
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_CURRENCYES:
    return {
      ...state,
      currencies: [...action.payload],
    };
  case SAVE_EXPENSE_WALLET:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE_WALLET:
    return {
      ...state,
      expenses: [...action.payload],
    };
  case OPEN_EDIT_EXPENSE:
    return {
      ...state,
      edit: true,
      idEdit: action.payload,
    };
  case SAVE_EDITED_EXPENSES:
    return {
      ...state,
      expenses: [...action.payload],
      edit: false,
    };
  default:
    return state;
  }
}

export default walletReducer;
