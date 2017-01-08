import { Router } from 'express';
import restify from 'express-restify-mongoose';

import Campaign from 'server/model/Campaign';
import Voucher from 'server/model/Voucher';

export default () => {
  const router = Router();
  restify.serve(router, Campaign);
  restify.serve(router, Voucher);
  
  return router;
};