import authorization from 'server/routes/authorization';

export default (app) => {
  app.use('/api', authorization(app));
};