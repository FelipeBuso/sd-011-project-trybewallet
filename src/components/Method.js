import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Method extends Component {
  render() {
    const { handleChange, value } = this.props;
    return (
      <div>
        <label htmlFor="método de pagamento">
          Método de pagamento:
          <select
            id="método de pagamento"
            name="method"
            data-testid="method-input"
            onChange={ (e) => handleChange(e) }
            value={ value }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }
}

Method.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
