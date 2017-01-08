import supertest from 'supertest-as-promised';
import { expect } from 'chai';
import Voucher from 'server/model/Voucher';

describe('campaign', () => {
  it('should throw error when try to publish new campaign with to small size', (done) => {
    supertest(global.server)
      .post('/api/v1/Campaign')
      .set('Authorization', 'abc')
      .send({ size: 0 })
      .expect(400, done);
  });

  it('should throw error when try to publish new campaign with to big size', (done) => {
    supertest(global.server)
      .post('/api/v1/Campaign')
      .set('Authorization', 'abc')
      .send({ size: 999999999 })
      .expect(400, done);
  });

  it('should throw error if required fields aren\'t given', (done) => {
    supertest(global.server)
      .post('/api/v1/Campaign')
      .set('Authorization', 'abc')
      .send({
        size: 2,
      })
      .expect(500, done);
  });

  it('should return code=200 when try tu publish campaign with valid data', (done) => {
    supertest(global.server)
      .post('/api/v1/Campaign')
      .set('Authorization', 'abc')
      .send({
        size: 2,
        discount: 10,
        prefix: 'TEST',
      })
      .expect(200, done);
  });
  
  it('should create vouchers after publish new campaign', (done) => {
    supertest(global.server)
      .post('/api/v1/Campaign')
      .set('Authorization', 'abc')
      .send({
        size: 2,
        discount: 10,
        prefix: 'TEST',
      })
      .expect(200)
      .then(() => supertest(global.server)
        .get('/api/v1/Vaoucher/count')
        .set('Authorization', 'abc')
        .expect(200)
      )
      .then(() => Voucher.count())
      .then((count) => expect(count).to.equal(2))
      .then(() => done())
      .catch(error => done(error));
  });
});