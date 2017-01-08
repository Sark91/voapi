export default (app) => {
  app.use((req, res, next) => {
    const authToken = req.headers.authorization;

    if (authToken !== 'abc') {
      return res.status(401).end();
    }

    return next();
  });
};