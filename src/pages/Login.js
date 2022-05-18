import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { userEmailAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.changeRoute = this.changeRoute.bind(this);

    this.state = {
      inputPassword: '',
    };
  }

  handleEmailChange({ target }) {
    const { dispatchLoginChange } = this.props;
    const { value } = target;
    dispatchLoginChange(value);
  }

  handlePasswordChange({ target }) {
    const { value } = target;
    this.setState({
      inputPassword: value,
    });
  }

  changeRoute() {
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { userEmailState } = this.props;
    const { inputPassword } = this.state;
    const MIN_PASSWORD_LENGTH = 5;

    return (
      <div>
        <p>Login</p>
        <label htmlFor="input-email">
          E-mail
          <input
            id="input-email"
            placeholder="Insira seu e-mail"
            type="email"
            data-testid="email-input"
            onChange={ this.handleEmailChange }
          />
        </label>
        <label htmlFor="password-email">
          Senha
          <input
            id="password-email"
            placeholder="Insira sua senha"
            type="password"
            data-testid="password-input"
            value={ inputPassword }
            onChange={ this.handlePasswordChange }
          />
        </label>
        <button
          type="button"
          disabled={
            inputPassword.length <= MIN_PASSWORD_LENGTH
            || !userEmailState.email.includes('@')
            || !userEmailState.email.includes('.com')
          }
          onClick={ this.changeRoute }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmailState: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginChange: (emailValue) => dispatch(userEmailAction(emailValue)),
});

Login.propTypes = {
  userEmailState: propTypes.shape({
    email: propTypes.string.isRequired,
  }),
  dispatchLoginChange: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }),
};

Login.defaultProps = {
  userEmailState: null,
  history: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
