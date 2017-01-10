import mongoose from 'mongoose';

import { discountType, voucherType } from 'server/model/Campaign';

const voucherSchema = new mongoose.Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  voucherId: String,
  discount: Number,
  discountType: {
    type: String,
    enum: Object.keys(discountType),
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

// voucherSchema.pre('save', function (next) {
//   this.voucherId = _.uniqueId(Date.now());
//   next();
// });

export default Voucher;
export {
  discountType,
  voucherType,
};