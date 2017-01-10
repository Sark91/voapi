import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const OrderSummaryProduct = ({ name, description, price, priceWithDiscount }) => {
  const originalPrice = price.toFixed(2);

  return (
    <tr className="OrderSummaryProduct">
      <td className="OrderSummaryProduct__Name">{name}</td>
      <td className="OrderSummaryProduct__Description">{description}</td>
      <td className="OrderSummaryProduct__OriginalPrice">{originalPrice}</td>
      <td className="OrderSummaryProduct__PriceWithDiscount">{priceWithDiscount}</td>
    </tr>
  );
};

OrderSummaryProduct.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  priceWithDiscount: PropTypes.number,
};

export default OrderSummaryProduct;
