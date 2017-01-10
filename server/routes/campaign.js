import _ from 'lodash';
import Campaign from 'server/model/Campaign';
import Voucher from 'server/model/Voucher';
import config from 'config';
import { sendError, sendSuccess } from 'server/sendResponse';

export default () => (req, res) => {
  const size = parseInt(req.body.size);

  if (!size || size < 1 || size > config.MAX_CAMPAIGN_SIZE) {
    return sendError(res, `Campaign size have to be between 1 and ${config.MAX_CAMPAIGN_SIZE}`, 400);
  }

  const newCampaign = new Campaign(req.body);

  newCampaign.save()
    .then((campaign) => {
      const promises = [];

      for (let i = 0; i < size; i++) {
        const voucherData = { ...campaign._doc };

        delete voucherData._id;

        const newVoucher = new Voucher({
          ...voucherData,
          voucherId: `${campaign.prefix}_${_.uniqueId(Date.now())}`,
          campaign,
        });

        promises.push(newVoucher.save());
      }

      return Promise.all(promises)
        .then(() => sendSuccess(res))
        .catch(error => sendError(res, error));
    })
    .catch(error => sendError(res, error));
};