import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmailState, expensesState } = this.props;
    const initialReduceValue = 0;
    const getValues = expensesState.expenses.reduce((acc, curr) => {
      const currentCurrency = Object.entries(curr.exchangeRates)
        .find((currency) => currency[1].code === curr.currency);
      return acc + (curr.value * currentCurrency[1].ask);
    }, initialReduceValue);

    return (
      <div>
        <p data-testid="email-field">{ userEmailState.email }</p>
        <p>Despesa Total:</p>
        <ul>
          <li data-testid="total-field" value="0">{getValues.toFixed(2)}</li>
          <li data-testid="header-currency-field">BRL</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmailState: state.user,
  expensesState: state.wallet,
});

Header.propTypes = {
  userEmailState: propTypes.shape().isRequired,
  expensesState: propTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Header);
