import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getVoucher } from 'client/reducers/actions/products';

@connect(
  state => ({
    voucher: state.products.voucher,
    voucherFetch: state.products.voucherFetch,
    voucherFetchError: state.products.voucherFetchError,
  }),
  dispatch => bindActionCreators({
    getVoucher,
  }, dispatch)
)
export default class VoucherLoader extends React.Component {
  static propTypes = {
    getVoucher: PropTypes.func,
    voucher: PropTypes.object,
    voucherFetchError: PropTypes.bool,
    voucherFetch: PropTypes.bool,
  }

  handleClick = () => {
    this.props.getVoucher(this.voucherIdRef.value);
  };

  render() {
    const voucher = this.props.voucher;

    return (
      <div className="VoucherLoader">
        {voucher ? (
          <div>
            <h4>Voucher: {voucher.voucherId}</h4>
            Znizka: {voucher.discount}<br />
            Pozostalo uzyc: {voucher.useRemain}<br />
          </div>
        ) : null}
        {this.props.voucherFetchError ? 'Wystapil blad podczas pobierania vouchera' : null}
        {this.props.voucherFetch ? (
          <span>Pobieranie vouchera</span>
        ) : (
          <div>
            <br />
            <input
              ref={(voucherIdRef) => { this.voucherIdRef = voucherIdRef; }}
              type="text"
              placeholder="Wpisz swój voucher"
            />
            <button onClick={this.handleClick}>Dodaj voucher</button>
          </div>
        )}
      </div>
    );
  }
}
