import supertest from 'supertest-as-promised';
import { expect } from 'chai';
import Voucher from 'server/model/Voucher';

describe('vouchers', () => {
  it('should get voucher from data base', (done) => {
    supertest(global.server)
      .post('/api/v1/Campaign')
      .set('Authorization', 'abc')
      .send({
        size: 1,
        discount: 10,
        prefix: 'TEST',
      })
      .expect(200)
      .then(() => supertest(global.server)
        .get('/api/v1/Vaoucher')
        .set('Authorization', 'abc')
        .expect(200),
      )
      .then(() => Voucher.find({}))
      .then((docs) => {
        expect(docs).to.have.length(1);
        expect(docs[0]).to.have.property('discount', 10);
        expect(docs[0].voucherId).to.match(/^TEST/);
      })
      .then(() => done())
      .catch(error => done(error));
  });

  it('should throw error when try to burn promotion before vaildDate', (done) => {
    supertest(global.server)
      .post('/api/v1/Campaign')
      .set('Authorization', 'abc')
      .send({
        size: 1,
        discount: 10,
        prefix: 'TEST',
        validFrom: new Date('01-01-2099'),
      })
      .expect(200)
      .then(() => supertest(global.server)
        .get('/api/v1/Voucher')
        .set('Authorization', 'abc')
        .expect(200),
      )
      .then(() => Voucher.find({}))
      .then((docs) => {
        expect(docs).to.have.length(1);
        expect(docs[0]).to.have.property('discount', 10);
        expect(docs[0].voucherId).to.match(/^TEST/);
        return docs[0];
      })
      .then(voucher => supertest(global.server)
        .post(`/api/v1/burn/${voucher._id}`)
        .set('Authorization', 'abc')
        .expect(400),
      )
      .then(() => done())
      .catch(error => done(error));
  });

  it('should throw error when try to burn promotion after vaildDate', (done) => {
    supertest(global.server)
      .post('/api/v1/Campaign')
      .set('Authorization', 'abc')
      .send({
        size: 1,
        discount: 10,
        prefix: 'TEST',
        validTo: new Date('07-11-1991'),
      })
      .expect(200)
      .then(() => supertest(global.server)
        .get('/api/v1/Voucher')
        .set('Authorization', 'abc')
        .expect(200),
      )
      .then(() => Voucher.find({}))
      .then((docs) => {
        expect(docs).to.have.length(1);
        expect(docs[0]).to.have.property('discount', 10);
        expect(docs[0].voucherId).to.match(/^TEST/);
        return docs[0];
      })
      .then(voucher => supertest(global.server)
        .post(`/api/v1/burn/${voucher._id}`)
        .set('Authorization', 'abc')
        .expect(400),
      )
      .then(() => done())
      .catch(error => done(error));
  });

  it('should throw error when try to burn promotion with useRemain = 0', (done) => {
    supertest(global.server)
      .post('/api/v1/Campaign')
      .set('Authorization', 'abc')
      .send({
        size: 1,
        discount: 10,
        prefix: 'TEST',
        useRemain: 0,
      })
      .expect(200)
      .then(() => supertest(global.server)
        .get('/api/v1/Voucher')
        .set('Authorization', 'abc')
        .expect(200),
      )
      .then(() => Voucher.find({}))
      .then((docs) => {
        expect(docs).to.have.length(1);
        expect(docs[0]).to.have.property('discount', 10);
        expect(docs[0].voucherId).to.match(/^TEST/);
        return docs[0];
      })
      .then(voucher => supertest(global.server)
        .post(`/api/v1/burn/${voucher._id}`)
        .set('Authorization', 'abc')
        .expect(400),
      )
      .then(() => done())
      .catch(error => done(error));
  });

  it('should return code=200 when try to burn promotion in vaildDate', (done) => {
    supertest(global.server)
      .post('/api/v1/Campaign')
      .set('Authorization', 'abc')
      .send({
        size: 1,
        discount: 10,
        prefix: 'TEST',
        validFrom: new Date('07-11-1991'),
        validTo: new Date('01-01-2099'),
      })
      .expect(200)
      .then(() => supertest(global.server)
        .get('/api/v1/Voucher')
        .set('Authorization', 'abc')
        .expect(200),
      )
      .then(() => Voucher.find({}))
      .then((docs) => {
        expect(docs).to.have.length(1);
        expect(docs[0]).to.have.property('discount', 10);
        expect(docs[0].voucherId).to.match(/^TEST/);
        return docs[0];
      })
      .then(voucher => supertest(global.server)
        .post(`/api/v1/burn/${voucher._id}`)
        .set('Authorization', 'abc')
        .expect(200),
      )
      .then(() => Voucher.find({}))
      .then(docs => expect(docs[0]).to.have.property('useRemain', 0))
      .then(() => done())
      .catch(error => done(error));
  });
});