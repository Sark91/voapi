import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { burnVoucher } from 'client/reducers/actions/products';

@connect(
  state => ({
    voucher: state.products.voucher,
    voucherBurningError: state.products.voucherBurningError,
  }),
  dispatch => bindActionCreators({
    burnVoucher,
  }, dispatch)
)
export default class OrderSummaryCreateOrder extends React.Component {
  static propTypes = {
    voucher: PropTypes.object,
    burnVoucher: PropTypes.func,
    voucherBurningError: PropTypes.bool,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  handleClick = () => {
    // to powinno isc jedna akcja, ale nie ma akcji order,
    // wiec wysle tylko burna (tzn w orderze powinien sie automatycznie robic burn)

    (this.props.voucher ? this.props.burnVoucher(this.props.voucher._id) : Promise.resolve())
      .then(() => this.context.router.push('/thankyou'));
  };

  render() {
    return (
      <div className="OrderSummaryCreateOrder">
        {this.props.voucherBurningError ? 'Nie można złożyć zamówienia' : null}
        <br />
        <button
          onClick={this.handleClick}
        >Złóż zamówienie</button>
      </div>
    );
  }
}