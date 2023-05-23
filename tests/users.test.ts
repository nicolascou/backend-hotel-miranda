import app, { server } from '../src/server';
import supertest from 'supertest';
import Users from '../src/services/data/users.json';


describe('User Routes', () => {
  it('should return users json', async() => {
    const res = await supertest(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual(Users);
  });

  it('should return user with id 1', async () => {
    const res = await supertest(app).get('/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('should create user', async () => {
    const res = await supertest(app).post('/users');
    expect(res.statusCode).toBe(201);
  });
});


afterAll(() => {
  server.close();
})