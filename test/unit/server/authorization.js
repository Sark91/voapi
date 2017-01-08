import supertest from 'supertest';
import { expect } from 'chai';

describe('authorization', () => {
  it('should return code=401 if send request without auth header', (done) => {
    supertest(global.server)
      .get('/api')
      .expect(401, done);
  });

  it('should return code=401 if send request with invalid auth header', (done) => {
    supertest(global.server)
      .get('/api')
      .set('Authorization', 'xyz')
      .expect(401, done);
  });

  it('should return code=200 if send request with valid auth header', (done) => {
    supertest(global.server)
      .get('/api')
      .set('Authorization', 'abc')
      .expect(200, done);
  });
});