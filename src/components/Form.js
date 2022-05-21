import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExpensesCoin, finishEdit } from '../actions';
import Table from './Table';

const alimentacao = 'Alimentação';

class Form extends Component {
  constructor() {
    super();

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleEditExpense = this.handleEditExpense.bind(this);

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

  handleFormChange({ target }) {
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

  handleAddExpense() {
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

  handleEditExpense() {
    const { finishEditDispatch, currenciesState } = this.props;
    const { expenses } = this.state;

    const editedExpense = {
      id: currenciesState.editingId,
      value: expenses.value,
      description: expenses.description,
      currency: expenses.currency,
      method: expenses.method,
      tag: expenses.tag,
    };

    const editedList = currenciesState.expenses.map((list) => {
      if (list.id === editedExpense.id) {
        return {
          id: editedExpense.id,
          value: editedExpense.value,
          description: editedExpense.description,
          currency: editedExpense.currency,
          method: editedExpense.method,
          tag: editedExpense.tag,
          exchangeRates: list.exchangeRates,
        };
      }
      return list;
    });

    finishEditDispatch(editedList);

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currenciesState } = this.props;

    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const allTags = [alimentacao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    const addExpensesButton = (
      <button
        type="button"
        onClick={ this.handleAddExpense }
        disabled={ value <= 0 || '' }
      >
        Adicionar despesa
      </button>
    );

    const editExpensesButton = (
      <button
        type="button"
        data-testid="edit-btn"
        onClick={ this.handleEditExpense }
      >
        Editar despesa
      </button>
    );

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
            onChange={ this.handleFormChange }
          />
        </label>
        <label htmlFor="select-coin">
          Moeda
          <select
            id="select-coin"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleFormChange }
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
            onChange={ this.handleFormChange }
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
            onChange={ this.handleFormChange }
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
            onChange={ this.handleFormChange }
          />
        </label>
        { currenciesState.isEditingExpense ? editExpensesButton : addExpensesButton }
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesState: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  sendFormValues: (expenses) => dispatch(fetchExpensesCoin(expenses)),
  finishEditDispatch: (edit) => dispatch(finishEdit(edit)),
});

Form.propTypes = {
  currenciesState: propTypes.shape().isRequired,
  sendFormValues: propTypes.func.isRequired,
  finishEditDispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
