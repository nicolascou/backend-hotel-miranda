import supertest from 'supertest';
import app from '../src/server';

describe('User Routes', () => {
  it('should return users json', async() => {
    const res = await supertest(app).get('/users');
    expect(res.statusCode).toBe(200);
  });
});