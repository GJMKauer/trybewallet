import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    // const { userEmailState } = this.props;
    // const beforeEmail = <p>Some daqui seu engraçadinho.</p>;
    const afterEmail = (
      <div>
        {/* <p>Inseriu o e-mail, né!? :D</p> */}
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

Wallet.propTypes = {
  userEmailState: propTypes.shape({
    email: propTypes.string.isRequired,
  }),
};

Wallet.defaultProps = {
  userEmailState: null,
};

export default connect(mapStateToProps)(Wallet);
