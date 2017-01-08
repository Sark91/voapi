import api from 'server/routes/api';
import dist from 'server/routes/dist';

export default (app) => {
  api(app);
  dist(app);

  return app;
};