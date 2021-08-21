import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import EnterExpense from '../components/EnterExpense';
import TableExpenses from '../components/TableExpenses';
import EditExpense from '../components/EditExpense';
import '../styles/EditExpense.css';

class Wallet extends React.Component {
  render() {
    const { edit } = this.props;
    return (
      <div className="page-wallet">
        <Header />
        { edit ? <EditExpense /> : <EnterExpense />}
        <TableExpenses />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ edit: state.wallet.edit });

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  edit: PropTypes.string.isRequired,
};
