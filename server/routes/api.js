import authorization from 'server/routes/authorization';
import campaign from 'server/routes/campaign';
import restify from 'server/routes/restify';

export default (app) => {
  app.use('/api', authorization(app));
  app.post('/api/v1/Campaign', campaign());
  restify(app);
};