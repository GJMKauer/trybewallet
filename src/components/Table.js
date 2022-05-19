import React from 'react';
// import { connect } from 'react-redux';
// import propTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const tableHeader = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
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
        </table>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   expensesState: state.wallet,
// });

// Table.propTypes = {
//   userEmailState: propTypes.shape().isRequired,
// };

export default Table;
