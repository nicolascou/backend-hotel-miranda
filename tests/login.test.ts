import app, { server } from '../src/server';
import supertest from 'supertest';

describe('Login Route', () => {
  it('should login and return token', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({
        name: "nico",
        password: "1234"
      })
      .expect(200);
    expect(res.body.token).toBeDefined();
  });

  it('should not login, incorrect user', async () => {
    await supertest(app)
      .post('/login')
      .send({
        name: "nico",
        password: "incorrect"
      })
      .expect(500);
  });
});

server.close();