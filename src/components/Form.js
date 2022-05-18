import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { currenciesState } = this.props;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const allTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <label htmlFor="value-input">
          Valor
          <input
            id="value-input"
            data-testid="value-input"
            type="number"
            placeholder="Insira o valor da despesa"
          />
        </label>
        <label htmlFor="select-coin">
          Moeda
          <select id="select-coin">
            { currenciesState.currencies.map((coin, index) => (
              <option key={ index }>{ coin }</option>
            )) }
          </select>
        </label>
        <label htmlFor="payment-method">
          Método de pagamento
          <select id="payment-method" data-testid="method-input">
            { paymentMethods.map((method, index) => (
              <option key={ index }>{ method }</option>
            )) }
          </select>
        </label>
        <label htmlFor="tag">
          Adicione uma tag
          <select id="tag" data-testid="tag-input">
            { allTags.map((tag, index) => (
              <option key={ index }>{ tag }</option>
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
          />
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesState: state.wallet,
});

Form.propTypes = {
  currenciesState: propTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Form);
