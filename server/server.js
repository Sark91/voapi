import env from 'node-env-file';
import express from 'express';
import path from 'path';
import appRoutes from 'server/routes';
import 'server/model';

env(path.resolve(__dirname,
  process.env.NODE_ENV === 'production'
    ? '../.env'
    : '../.test.env'
));

const app = express();

appRoutes(app);

const server = (serverStartCb) => {
  const serverInstance = app.listen(process.env.SERVER_PORT, () => {
    const { address, port } = serverInstance.address();

    // eslint-disable-next-line no-console
    console.log(`App listening at http://${address}:${port}`);

    if (serverStartCb instanceof Function) {
      serverStartCb();
    }
  });

  return serverInstance;
};

export default server;
export {
  app,
};