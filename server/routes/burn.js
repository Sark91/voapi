import Voucher from 'server/model/Voucher';
import { sendError, sendSuccess } from 'server/sendResponse';


export default () => (req, res) => {
  Voucher
    .find({ _id: req.params.voucherId })
    .then(docs => docs[0])
    .then((doc) => {
      const now = Date.now();
      if (
        (doc.validFrom && doc.validFrom.getTime() > now) ||
        (doc.validTo && doc.validTo.getTime() < now)
      ) {
        return sendError(res, 'Voucher is invalid', 400);
      }

      if (doc.useRemain <= 0) {
        return sendError(res, 'voucher is not usable', 400);
      }

      doc.useRemain -= 1;

      return doc
        .save()
        .then(() => sendSuccess(res))
        .catch((error) => {
          sendError(res, error);
        });
    });
};