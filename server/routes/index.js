import api from 'server/routes/api';

export default (app) => {
  api(app);

  app.get('/', (req, res) => {
    res.send('OK').end();
  });

  return app;
};