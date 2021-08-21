import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as user from '../actions';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disableButton: true,
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
  }

  handlerChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
      disableButton: true,
    }, () => {
      if (this.checkEmail() && this.checkPassword()) {
        this.setState({
          disableButton: false,
        });
      }
    });
  }

  checkPassword() {
    const { password } = this.state;
    const limit = 5;
    return (password.length > limit);
  }

  checkEmail() {
    const { email } = this.state;
    const eCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return eCheck.test(email);
  }

  render() {
    const { email, password, disableButton } = this.state;
    const { saveEmail } = this.props;
    return (
      <div className="login-page">
        <div className="login-logo">
          <h1>Trybewallet</h1>
        </div>
        <div className="login-fields">
          <input
            name="email"
            type="text"
            data-testid="email-input"
            onChange={ (e) => this.handlerChange(e) }
            value={ email }
            placeholder="Digite um e-mail valido"
          />
          <input
            name="password"
            type="text"
            data-testid="password-input"
            onChange={ (e) => this.handlerChange(e) }
            value={ password }
            placeholder="Digite a senha com no mínimo 6 caracteres"
          />
          <Link to={ { pathname: 'carteira' } }>
            <button
              disabled={ disableButton }
              type="button"
              onClick={ () => saveEmail(email) }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  { saveEmail: (email) => dispatch(user.saveEmailUser(email)) }
);

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};
