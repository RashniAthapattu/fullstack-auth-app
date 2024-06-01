import request from 'supertest';
import { app, serverInstace } from '../src/index';
import connection, { disconnection } from '../src/database/connection';

describe('Test the user controller', () => {
  let refreshToken: string;
  let accessToken: string;

  const NEW_USER_NAME = 'testuser';
  const NEW_EMAIL = 'testusers2@gmail.com';
  const CORRECT_PASSWORD = 'password123';

  beforeAll(async () => {
    await connection();
  });

  afterAll(async () => {
    await disconnection();

    serverInstace.close();
  });

  // Register user controller test case
  test('Register user route test', async () => {
    const response = await request(app).post('/auth/register').send({
      name: NEW_USER_NAME,
      email: NEW_EMAIL,
      password: CORRECT_PASSWORD,
    });
    const cookies = response.headers['set-cookie'];
    if (cookies) {
      const cookieArray = Array.isArray(cookies) ? cookies : cookies.split(';');
      cookieArray.forEach((cookieStr) => {
        const parts = cookieStr.split(';');
        for (let part of parts) {
          const keyValue = part.split('=');
          const key = keyValue[0].trim();
          if (key === 'jwt') {
            refreshToken = keyValue[1];
            break;
          }
        }
      });
    }

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    });
    expect(typeof refreshToken).toBe('string');
  });

  // Login user controller test case
  test('Login user route test', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: NEW_EMAIL, password: CORRECT_PASSWORD });
    const cookies = response.headers['set-cookie'];
    if (cookies) {
      const cookieArray = Array.isArray(cookies) ? cookies : cookies.split(';');
      cookieArray.forEach((cookieStr) => {
        const parts = cookieStr.split(';');
        for (let part of parts) {
          const keyValue = part.split('=');
          const key = keyValue[0].trim();
          if (key === 'jwt') {
            refreshToken = keyValue[1];
            break;
          }
        }
      });
    }
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    });
    accessToken = response.body.accessToken;
    expect(typeof refreshToken).toBe('string');
  });

  // Refreshtoken controller test case
  test('Refreshtoken route test', async () => {
    const response = await request(app)
      .get('/auth/refreshToken')
      .set('Cookie', [`jwt=${refreshToken}`]);
    accessToken = response.body.accessToken;

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    });
  });

  // Protectedroute controller test case
  test('Protected route test', async () => {
    const response = await request(app)
      .get('/auth/protected')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
  });

  // Logout user controller test case
  test('LogOut user test', async () => {
    const response = await request(app)
      .post('/auth/logout')
      .set('Cookie', [`jwt=${refreshToken}`]);

    expect(response.status).toBe(204);
  });

  // Register user controller error test case
  test("should response user friendly error if user's email is already registered ", async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'test', email: 'test@gmail.com', password: '123456' });

    expect(response.body.message).toEqual('Email Already Registered');
  });

  // Login user controller error test case
  test("should response user friendly error if user's password is incorrect", async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: NEW_EMAIL, password: 'wrongpassword' });

    expect(response.statusCode).toEqual(401);
  });

  // Login user controller error test case
  test("should response user friendly error if user's email isn't registered ", async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'testd@gmail.com', password: '123456' });

    expect(response.statusCode).toEqual(401);
  });
});
