import serverCreator from 'server/server';
import env from 'node-env-file';
import path from 'path';

env(path.resolve(__dirname, '../.test.env'));

beforeEach((done) => {
  global.server = serverCreator(done);
});

afterEach((done) => {
  global.server.cleanConnection(done);
  global.server.getDbConnection().dropDatabase();
});