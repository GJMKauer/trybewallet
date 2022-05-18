import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatchCurrencyAPI } = this.props;
    await dispatchCurrencyAPI();
  }

  render() {
    // const { userEmailState } = this.props;
    // const beforeEmail = <p>Some daqui seu engraçadinho.</p>;
    const afterEmail = (
      <div>
        {/* <p>Inseriu o e-mail, né!? :D</p> */ }
        <Header />
      </div>
    );
    return (
      // userEmailState.email.length !== 0 ? afterEmail : beforeEmail);
      afterEmail);
  }
}

const mapStateToProps = (state) => ({
  userEmailState: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencyAPI: (currency) => dispatch(fetchCurrencies(currency)),
});

Wallet.propTypes = {
  userEmailState: propTypes.shape({
    email: propTypes.string.isRequired,
  }),
  dispatchCurrencyAPI: propTypes.func.isRequired,
};

Wallet.defaultProps = {
  userEmailState: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
