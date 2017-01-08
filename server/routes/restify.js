import { Router } from 'express';
import restify from 'express-restify-mongoose';

import Campaign from 'server/model/Campaign';
import Voucher from 'server/model/Voucher';

export default (app) => {
  const router = Router();
  restify.serve(app, Campaign);
  restify.serve(app, Voucher);
  
  return router;
};