import authorization from 'server/routes/authorization';
import campaign from 'server/routes/campaign';
import burn from 'server/routes/burn';
import restify from 'server/routes/restify';

export default (app) => {
  app.use('/api', authorization(app));
  app.post('/api/v1/Campaign', campaign());
  app.post('/api/v1/burn/:voucherId', burn());
  restify(app);
};