import supertest from 'supertest';
import { expect } from 'chai';
import serverCreator, { app } from 'server/server';

describe('authorization', () => {
  let server;

  beforeEach((done) => {
    server = serverCreator(done);
  });

  afterEach(() => {
    server.close();
  });

  it('should return code=401 if send request without auth header', (done) => {
    supertest(server)
      .get('/')
      .expect(401, done);
  });

  it('should return code=401 if send request with invalid auth header', (done) => {
    supertest(server)
      .get('/')
      .set('Authorization', 'xyz')
      .expect(401, done);
  });

  it('should return code=200 if send request with valid auth header', (done) => {
    supertest(server)
      .get('/')
      .set('Authorization', 'abc')
      .expect(200, done);
  });
});