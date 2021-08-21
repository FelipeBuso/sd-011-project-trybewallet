import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Method from './Method';
import Tag from './Tag';
import { saveEditedExpense } from '../actions';
import '../styles/EditExpense.css';

class EditExpense extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.getExpenseFromStore = this.getExpenseFromStore.bind(this);
    this.optionsCurrency = this.optionsCurrency.bind(this);
    this.saveEditedExpensesWallet = this.saveEditedExpensesWallet.bind(this);
  }

  componentDidMount() {
    this.getExpenseFromStore();
  }

  getExpenseFromStore() {
    const { wallet: { idEdit, expenses } } = this.props;
    const expenseFiltered = expenses.filter((expense) => expense.id === idEdit);
    console.log(expenseFiltered[0].id);
    this.setState({
      id: expenseFiltered[0].id,
      value: expenseFiltered[0].value,
      description: expenseFiltered[0].description,
      currency: expenseFiltered[0].currency,
      method: expenseFiltered[0].method,
      tag: expenseFiltered[0].tag,
      exchangeRates: expenseFiltered[0].exchangeRates,
    });
  }

  createObjectExpense() {
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const objectExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    return objectExpense;
  }

  optionsCurrency() {
    const { wallet: { currencies } } = this.props;
    return currencies.map((currency, i) => (
      <option
        key={ i }
        value={ currency }
      >
        { currency }
      </option>
    ));
  }

  saveEditedExpensesWallet() {
    const { id } = this.state;
    const { wallet: { expenses }, saveEditedExpenses } = this.props;
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    const editedExpense = this.createObjectExpense();
    const editedExpensesWallet = [...filteredExpenses, editedExpense];
    const sortEditedExpensesWallet = editedExpensesWallet.sort((a, b) => a.id - b.id);
    saveEditedExpenses(sortEditedExpensesWallet);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="form-edit-expense">
        <label htmlFor="valor">
          Valor:
          <input
            type="number"
            id="valor"
            name="value"
            min="0"
            data-testid="value-input"
            onChange={ (e) => this.handleChange(e) }
            value={ value }
          />
        </label>
        <label htmlFor="descrição">
          Descrição:
          <input
            id="descrição"
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ (e) => this.handleChange(e) }
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            onChange={ (e) => this.handleChange(e) }
            value={ currency }
          >
            { this.optionsCurrency() }
          </select>
        </label>
        <Method value={ method } handleChange={ this.handleChange } />
        <Tag value={ tag } handleChange={ this.handleChange } />
        <button
          type="button"
          onClick={ () => this.saveEditedExpensesWallet() }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({ wallet: state.wallet });

const mapDispatchToProps = (dispatch) => ({
  saveEditedExpenses: (expense) => dispatch(saveEditedExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);

EditExpense.propTypes = {
  saveEditedExpenses: PropTypes.func.isRequired,
  wallet: PropTypes.arrayOf(
    PropTypes.string,
    PropTypes.number,
  ),
};

EditExpense.defaultProps = {
  wallet: [],
};
