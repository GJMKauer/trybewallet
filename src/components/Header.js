import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmailState } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ userEmailState.email }</p>
        <p>Despesa Total:</p>
        <ul>
          <li data-testid="total-field" value="0">0</li>
          <li data-testid="header-currency-field">BRL</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmailState: state.user,
});

Header.propTypes = {
  userEmailState: propTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Header);
