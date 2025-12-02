const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config({ path: '.env.example' });

const app = require('../app');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await Promise.all(
    Object.values(mongoose.connection.collections).map((collection) =>
      collection.deleteMany({})
    )
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('Auth API', () => {
  test('registers a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'Password123!',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe('alice@example.com');
    expect(res.body.data.accessToken).toBeDefined();
  });

  test('logs in an existing user and sets refresh cookie', async () => {
    await User.create({
      name: 'Bob',
      email: 'bob@example.com',
      password: 'Password123!',
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'bob@example.com',
      password: 'Password123!',
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers['set-cookie']).toBeDefined();
    expect(res.body.data.accessToken).toBeTruthy();
  });

  test('refreshes token with rotation', async () => {
    await User.create({
      name: 'Carol',
      email: 'carol@example.com',
      password: 'Password123!',
    });

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'carol@example.com',
      password: 'Password123!',
    });

    const cookie = loginRes.headers['set-cookie'][0];
    const refreshToken = cookie.split(';')[0].split('=')[1];

    const refreshRes = await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', cookie)
      .send({ refreshToken });

    expect(refreshRes.statusCode).toBe(200);
    expect(refreshRes.body.data.accessToken).toBeDefined();
    const storedTokens = await RefreshToken.countDocuments({
      token: refreshRes.headers['set-cookie'][0]
        .split(';')[0]
        .split('=')[1],
    });
    expect(storedTokens).toBe(1);
  });

  test('changes password when authenticated', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Dave',
      email: 'dave@example.com',
      password: 'Password123!',
    });

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'dave@example.com',
      password: 'Password123!',
    });

    const token = loginRes.body.data.accessToken;

    const changeRes = await request(app)
      .patch('/api/auth/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        currentPassword: 'Password123!',
        newPassword: 'NewPassword123!',
      });

    expect(changeRes.statusCode).toBe(200);
    expect(changeRes.body.message).toMatch(/Password updated/);
  });
});

