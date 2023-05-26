import app, { server } from '../src/server';
import supertest from 'supertest';
import Users from '../src/repositories/databases/users.json';

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjg1MDkyNTYzfQ.OJfUYRtUGIinxwwde_PdBBLw2SikvQnrGSJQKGpt-gc';

describe('User CRUD, good requests', () => {
  it('should return users json', async() => {
    const res = await supertest(app)
      .get('/users')
      .auth(authToken, { type: 'bearer' })
      .expect(200);
    expect(res.body).toEqual(Users);
  });

  it('should return user with id 1', async () => {
    const res = await supertest(app)
      .get('/users/1')
      .auth(authToken, { type: 'bearer' })
      .expect(200);
    expect(res.body).toEqual(Users[0]);
  });

  it('should create user', async () => {
    const res = await supertest(app)
      .post('/users')
      .auth(authToken, { type: 'bearer' })
      .send({
        full_name: "Test User",
        username: "test",
        photo: "https://randomuser.me/api/portraits/women/30.jpg",
        position: "Room Service",
        description: "Taking orders from guests over the phone",
        email: "test@example.com",
        phone: "123456789",
        state: "active",
        password: "passwordtest"
      })
      .expect(201);
    expect(res.body.id).toEqual(Users[Users.length - 1].id + 1);
  });

  it('should update user', async () => {
    const res = await supertest(app)
      .put('/users/' + (Users[Users.length - 1].id + 1).toString())
      .auth(authToken, { type: 'bearer' })
      .send({
        full_name: "Test User Updated",
        username: "test",
        photo: "https://randomuser.me/api/portraits/women/30.jpg",
        position: "Room Service",
        description: "Taking orders from guests over the phone",
        email: "test@example.com",
        phone: "123456789",
        state: "active",
        password: "passwordtest"
      })
      .expect(200);
    expect(res.body.full_name).toBe("Test User Updated");
  })

  it('should delete user', async () => {
    const res = await supertest(app)
      .delete('/users/' + (Users[Users.length - 1].id + 1).toString())
      .auth(authToken, { type: 'bearer' })
      .expect(200);
    expect(res.text).toBe('User Deleted');
  });
});


afterAll(() => {
  server.close();
})