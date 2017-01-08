import mongoose from 'mongoose';
// import _ from 'lodash';

const discountType = {
  QUOTA: 'QUOTA',
  PERCENTAGE: 'PERCENTAGE',
};

const voucherType = {
  DISPOSABLE: 'DISPOSABLE',
  'REUSABLE': 'REUSABLE',
};

const campaignSchema = new mongoose.Schema({
  prefix: String,
  vouchers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher',
  }],
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

const Campaign = mongoose.model('Campaign', campaignSchema);

Voucher.pre('save', function (next) {
  // @todo update all vouchers!
  next();
});

export default Campaign;
export {
  discountType,
  voucherType,
}