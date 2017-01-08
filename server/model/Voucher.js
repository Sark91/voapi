import mongoose from 'mongoose';
import _ from 'lodash';

const discountType = {
  QUOTA: 'QUOTA',
  PERCENTAGE: 'PERCENTAGE',
};

const voucherType = {
  DISPOSABLE: 'DISPOSABLE',
  'REUSABLE': 'REUSABLE',
};

const voucherSchema = new mongoose.Schema({
  voucherId: String,
  discount: Number,
  discountType: {
    type: String,
    enum: Object.keys(voucherDiscountType),
  },
  voucherType: {
    type: String,
    enum: Object.keys(voucherType),
  },
  useRemain: Number,
  validFrom: Date,
  validTo: Date,
});

const Voucher = mongoose.model('Voucher', voucherSchema);

Voucher.pre('save', function (next) {
  this.voucherId = _.uniqueId(Date.now());
  next();
});

export default Voucher;
export {
  discountType,
  voucherType,
}