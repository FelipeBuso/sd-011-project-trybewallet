import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenseWallet, openEditExpense } from '../actions';
// import { openEditExpense } from '../actions';

class RowTableExpense extends Component {
  constructor() {
    super();
    this.state = {
      exchangeUsed: '',
      exchangeValue: 0,
    };
    this.extractExchangeObject = this.extractExchangeObject.bind(this);
    this.exctractExchangeName = this.exctractExchangeName.bind(this);
    this.extractExchangeValue = this.extractExchangeValue.bind(this);
    this.updateState = this.updateState.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(prevProps) {
    const { expense } = this.props;
    if (prevProps.expense !== expense) {
      this.updateState();
    }
  }

  updateState() {
    const exchangeObject = this.extractExchangeObject();
    const exchangeName = this.exctractExchangeName(exchangeObject);
    const exchangeValue = this.extractExchangeValue(exchangeObject);
    console.log(exchangeObject);
    this.setState({
      exchangeUsed: exchangeName[0],
      exchangeValue,
    });
  }

  extractExchangeObject() {
    const { expense: { exchangeRates, currency } } = this.props;
    const exchangeObject = Object.entries(exchangeRates).filter(
      (item) => item[1].code === currency,
    );
    console.log(exchangeObject);
    return exchangeObject;
  }

  exctractExchangeName(exchangeObject) {
    const exchangeName = exchangeObject[0][1].name;
    const exchangeUsed = exchangeName.split('/');
    console.log(exchangeUsed[0]);
    return exchangeUsed;
  }

  extractExchangeValue(exchangeObject) {
    const exchangeValue = exchangeObject[0][1].ask;
    return parseFloat(exchangeValue);
  }

  deleteExpense(id) {
    const { expenses, deleteExpense } = this.props;
    const deletedExpenseNewArray = expenses.filter((expense) => expense.id !== id);
    deleteExpense(deletedExpenseNewArray);
    // console.log(deletedExpenseNewArray);
  }

  render() {
    const { expense: { description, tag, method, value, id }, editExpense } = this.props;
    const { exchangeUsed, exchangeValue } = this.state;
    return (
      <tr className="table-row">
        <td name={ description } id={ description }>{ description }</td>
        <td name={ tag } id={ tag }>{ tag }</td>
        <td name={ method } id={ method }>{ method }</td>
        <td
          id={ value }
          name={ value }
        >
          { value }
        </td>
        <td name={ exchangeUsed } id={ exchangeUsed }>{ exchangeUsed }</td>
        <td
          name={ parseFloat((exchangeValue * 100) / 100).toFixed(2) }
          id={ parseFloat((exchangeValue * 100) / 100).toFixed(2) }
        >
          { parseFloat((exchangeValue * 100) / 100).toFixed(2) }
        </td>
        <td
          name={ parseFloat((value * exchangeValue * 100) / 100).toFixed(2) }
          id={ parseFloat((value * exchangeValue * 100) / 100).toFixed(2) }
        >
          { parseFloat((value * exchangeValue * 100) / 100).toFixed(2) }
        </td>
        <td name="Real" id="Real">Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.deleteExpense(id) }
          >
            Excluir
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => editExpense(id) }
          >
            Alterar despesa
          </button>
        </td>
      </tr>
    );
  }
}

RowTableExpense.propTypes = {
  editExpense: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
    currency: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  }),
  expenses: PropTypes.shape({
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
    currency: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
    filter: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  }),
  deleteExpense: PropTypes.func.isRequired,
};

RowTableExpense.defaultProps = {
  expense: PropTypes.shape({
    id: '',
    description: '',
    tag: '',
    method: '',
    value: '',
    currency: '',
    exchangeRates: {},
  }),
  expenses: PropTypes.shape({
    description: '',
    tag: '',
    method: '',
    value: '',
    currency: '',
    exchangeRates: {},
  }),
};

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (updatedExpenses) => dispatch(deleteExpenseWallet(updatedExpenses)),
  editExpense: (id) => dispatch(openEditExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RowTableExpense);
