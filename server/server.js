import express from 'express';
import bodyParser from 'body-parser';
import appRoutes from 'server/routes';
import dbConnection from 'server/model';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

appRoutes(app);

const server = (serverStartCb = () => {}) => {
  const serverInstance = app.listen(process.env.SERVER_PORT, () => {
    const { address, port } = serverInstance.address();

    // eslint-disable-next-line no-console
    console.log(`App listening at http://${address}:${port}`);

    dbConnection(serverStartCb);
  });

  serverInstance.cleanConnection = (cb) => {
    dbConnection.disconnect(
      () => serverInstance.close(cb)
    );
  };
  
  serverInstance.getDbConnection = dbConnection.getConnection;

  return serverInstance;
};

export default server;
export {
  app,
};