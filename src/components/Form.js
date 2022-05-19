import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchExpensesCoin } from '../actions';

const alimentacao = 'Alimentação';

class Form extends Component {
  constructor() {
    super();

    this.handleFormValue = this.handleFormValue.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
      expenses: {},
    };
  }

  handleFormValue({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, () => {
      const { id, value, description, currency, method, tag } = this.state;
      this.setState({
        expenses: {
          id,
          value,
          description,
          currency,
          method,
          tag,
        },
      });
    });
  }

  handleClick() {
    const { sendFormValues } = this.props;
    const { expenses } = this.state;

    sendFormValues(expenses);

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    }));
  }

  render() {
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const allTags = [alimentacao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { value, description, currency, method, tag } = this.state;
    const { currenciesState } = this.props;
    return (
      <div>
        <label htmlFor="value-input">
          Valor
          <input
            id="value-input"
            data-testid="value-input"
            type="number"
            placeholder="Insira o valor da despesa"
            name="value"
            value={ value }
            onChange={ this.handleFormValue }
          />
        </label>
        <label htmlFor="select-coin">
          Moeda
          <select
            id="select-coin"
            name="currency"
            value={ currency }
            onChange={ this.handleFormValue }
          >
            { currenciesState.currencies.map((coin, index) => (
              <option key={ index }>
                { coin }
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="payment-method">
          Método de pagamento
          <select
            id="payment-method"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleFormValue }
          >
            { paymentMethods.map((methods, index) => (
              <option key={ index }>{ methods }</option>
            )) }
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            id="tag"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleFormValue }
          >
            { allTags.map((tags, index) => (
              <option key={ index }>{ tags }</option>
            )) }
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição
          <input
            id="description-input"
            data-testid="description-input"
            type="text"
            placeholder="Descrição da despesa"
            name="description"
            value={ description }
            onChange={ this.handleFormValue }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ value <= 0 || '' }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesState: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  sendFormValues: (expenses) => dispatch(fetchExpensesCoin(expenses)),
});

Form.propTypes = {
  currenciesState: propTypes.shape().isRequired,
  sendFormValues: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
