import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  constructor() {
    super();

    this.removeExpense = this.removeExpense.bind(this);
  }

  removeExpense({ target }) {
    const { expensesState, deleteExpenseDispatch } = this.props;
    const teste = expensesState.expenses.filter((e) => e.id !== Number(target.id));
    deleteExpenseDispatch(teste);
  }

  render() {
    const tableHeader = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];

    const { expensesState } = this.props;

    const getAllNames = [];
    const getAllCambios = [];

    expensesState.expenses.reduce((acc, curr) => {
      const currentCurrency = Object.entries(curr.exchangeRates)
        .find((currency) => currency[1].code === curr.currency);
      return getAllNames.push(currentCurrency[1].name);
    }, 0);

    expensesState.expenses.reduce((acc, curr) => {
      const currentCurrency = Object.entries(curr.exchangeRates)
        .find((currency) => currency[1].code === curr.currency);
      return getAllCambios.push(Number(currentCurrency[1].ask));
    }, 0);

    return (
      <div>
        <table>
          <thead>
            <tr>
              { tableHeader.map((header, index) => (
                <th key={ index }>{ header }</th>
              )) }
            </tr>
          </thead>
          <tbody>
            { expensesState.expenses.map((row, index) => {
              const getConvertion = row.value * getAllCambios[index];
              const value = Number(row.value);

              return (
                <tr key={ row.id }>
                  <td>{ row.description }</td>
                  <td>{ row.tag }</td>
                  <td>{ row.method }</td>
                  <td>{ value.toFixed(2) }</td>
                  <td>{ getAllNames[index].replace('/Real Brasileiro', '') }</td>
                  <td>{ getAllCambios[index].toFixed(2) }</td>
                  <td>{ getConvertion.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button type="button">
                      Editar
                    </button>
                    <button
                      type="button"
                      id={ row.id }
                      data-testid="delete-btn"
                      onClick={ this.removeExpense }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesState: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseDispatch: (expense) => dispatch(deleteExpense(expense)),
});

Table.propTypes = {
  expensesState: propTypes.shape().isRequired,
  deleteExpenseDispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
