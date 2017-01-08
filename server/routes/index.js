import authorization from 'server/routes/authorization';

export default (app) => {
  authorization(app);

  app.get('/', (req, res) => {
    res.send('OK').end();
  });

  return app;
};