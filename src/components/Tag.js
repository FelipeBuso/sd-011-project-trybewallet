import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tag extends Component {
  render() {
    const { handleChange, value } = this.props;
    return (
      <div>
        <label htmlFor="tag">
          Tag:
          <select
            id="tag"
            name="tag"
            data-testid="tag-input"
            onChange={ (e) => handleChange(e) }
            value={ value }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

Tag.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
