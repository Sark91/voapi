import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import OrderSummaryProduct from 'client/components/OrderSummaryProduct';
import VoucherLoader from 'client/components/VoucherLoader';
import OrderSummaryCreateOrder from 'client/components/OrderSummaryCreateOrder';

const OrderSummary = ({ products, voucher }) => {
  let totalPrice = 0;
  let totalPriceWithDiscount = 0;

  return (
    <div className="OrderSummary">
      <h2 className="OrderSummary__Title">Podsumowanie Zamówienia</h2>

      <table className="OrderSummary__Products">
        <thead>
          <tr>
            <th>Produkt</th>
            <th>Opis</th>
            <th>Cena oryginalna</th>
            <th>Cena po zniżce</th>
          </tr>
        </thead>
        <tbody>
          {_.map(products, (product) => {
            let priceWithDiscount = product.price;

            if (voucher) {
              if (voucher.percentageDisamount) {
                priceWithDiscount *= voucher.percentageDisamount;
              } else if (voucher.quotaDisamount) {
                priceWithDiscount -= voucher.quotaDisamount;
              }
            }

            totalPrice += product.price;
            totalPriceWithDiscount += priceWithDiscount;

            return (
              <OrderSummaryProduct
                {...product}
                key={product.id}
                priceWithDiscount={priceWithDiscount.toFixed(2)}
              />
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="2">Podsumowanie</th>
            <th>{totalPrice.toFixed(2)}</th>
            <th>{totalPriceWithDiscount.toFixed(2)}</th>
          </tr>
        </tfoot>
      </table>
      <VoucherLoader />
      <OrderSummaryCreateOrder />
    </div>
  );
};

OrderSummary.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  voucher: PropTypes.object,
};

export default connect(
  state => ({
    products: state.products.products,
    voucher: state.products.voucher,
  }),
  null
)(OrderSummary);