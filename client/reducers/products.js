import {
  GET_VOUCHER,
  GET_VOUCHER_SUCCESS,
  GET_VOUCHER_ERROR,

  BURN_VOUCHER_SUCCESS,
  BURN_VOUCHER_ERROR,
} from 'client/reducers/actionTypes';

const initialState = {
  products: [
    { id: 'prod1', name: 'Monitor', price: 399.99, description: 'Fajna monitor' },
    { id: 'prod2', name: 'PC', price: 2200.50, description: 'super PC' },
    { id: 'prod3', name: 'Mysz', price: 23.13, description: 'Myszka description' },
    { id: 'prod4', name: 'Klawiatura', price: 49.99, description: 'Moja klawiatura' },
  ],
  voucher: null,
  voucherFetch: false,
  voucherFetchError: false,
  voucherBurningError: null,
};

export default function (state = initialState, action = null) {
  switch (action.type) {

    case GET_VOUCHER:
      return {
        ...state,
        voucherFetch: true,
        voucherFetchError: false,
      };

    case GET_VOUCHER_ERROR:
      return {
        ...state,
        voucherFetch: false,
        voucherFetchError: true,
        voucher: null,
      };

    case GET_VOUCHER_SUCCESS: {
      const voucherResult = action.result[0];

      if (voucherResult.discountType === 'QUOTA') {
        voucherResult.quotaDisamount = voucherResult.discount;
      } else {
        voucherResult.percentageDisamount = 1 - (voucherResult.discount / 100);
      }

      return {
        ...state,
        voucherFetch: false,
        voucherFetchError: false,
        voucher: voucherResult,
      };
    }

    // clear all state after success
    case BURN_VOUCHER_SUCCESS:
      return initialState;

    case BURN_VOUCHER_ERROR:
      return {
        ...state,
        voucherBurningError: true,
      };

    default:
      return state;
  }
}