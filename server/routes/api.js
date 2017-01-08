import authorization from 'server/routes/authorization';
import restify from 'server/routes/restify';

export default (app) => {
  app.use('/api', authorization(app));
  app.use('/api', restify());
};