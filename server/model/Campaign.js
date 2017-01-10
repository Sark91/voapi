import mongoose from 'mongoose';
// import Voucher from 'server/model/Voucher';
// import _ from 'lodash';

const discountType = {
  QUOTA: 'QUOTA',
  PERCENTAGE: 'PERCENTAGE',
};

const voucherType = {
  DISPOSABLE: 'DISPOSABLE',
  REUSABLE: 'REUSABLE',
};

const campaignSchema = new mongoose.Schema({
  prefix: { type: String, required: true },
  vouchers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher',
  }],
  discount: { type: Number, required: true },
  discountType: {
    type: String,
    enum: Object.keys(discountType),
    default: discountType.QUOTA,
  },
  voucherType: {
    type: String,
    enum: Object.keys(voucherType),
    default: voucherType.DISPOSABLE,
  },
  useRemain: { type: Number, default: 1 },
  validFrom: Date,
  validTo: Date,
});

const Campaign = mongoose.model('Campaign', campaignSchema);

campaignSchema.pre('save', (next) => {
  // @todo update all vouchers!
  next();
});

export default Campaign;
export {
  discountType,
  voucherType,
};