import authorization from 'server/router/authorization';

export default (app) => {
  app.use('/api', authorization);
};