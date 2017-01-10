import {
  GET_VOUCHER,
  GET_VOUCHER_SUCCESS,
  GET_VOUCHER_ERROR,

  BURN_VOUCHER,
  BURN_VOUCHER_SUCCESS,
  BURN_VOUCHER_ERROR,
} from 'client/reducers/actionTypes';

export const getVoucher = (voucherId) => ({
  types: [GET_VOUCHER, GET_VOUCHER_SUCCESS, GET_VOUCHER_ERROR],
  promise: (client) => client.get(`/Voucher?query={"voucherId":"${voucherId}"}`, {})
});

export const burnVoucher = (voucherRealId) => ({
  types: [BURN_VOUCHER, BURN_VOUCHER_SUCCESS, BURN_VOUCHER_ERROR],
  promise: (client) => client.post(`/burn/${voucherRealId}`, {})
});