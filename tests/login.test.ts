import request from 'supertest';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { app } from '../src/app';
import { dataSource } from '../src/dataSource';
import { User } from '../src/entities/user';

describe('POST /login', () => {
  const userRepo: Repository<User> = dataSource.getRepository(User);

  beforeAll(async () => await dataSource.initialize());
  afterAll(async () => await dataSource.destroy());
  afterEach(async () => await userRepo.clear());

  beforeEach(async () => {
    const salt: string = await bcrypt.genSalt(10);
    const john: User = new User();
    john.firstName = 'John';
    john.lastName = 'Doe';
    john.email = 'johndoe@example.com';
    john.password = await bcrypt.hash('johndoepass123', salt);
    await userRepo.save(john);
  });

  it('invalid payload', async () => {
    const response = await request(app).post('/login').send();

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.data.success).toBeFalsy();
    expect(response.body.data.errors.length).toBe(1);
    expect(response.body.data.errors[0].field).toBe('email');
  });

  it('unregistered email', async () => {
    const response = await request(app).post('/login').send({
      email: 'thefakejohndoe@example.com',
      password: 'thefakejohndoepass123',
    });

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.data.success).toBeFalsy();
    expect(response.body.data.errors.length).toBe(1);
    expect(response.body.data.errors[0].field).toBe('email');
  });

  it('wrong password', async () => {
    const response = await request(app).post('/login').send({
      email: 'johndoe@example.com',
      password: 'wrongpassword',
    });

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.data.success).toBeFalsy();
    expect(response.body.data.errors.length).toBe(1);
    expect(response.body.data.errors[0].field).toBe('password');
  });

  it('valid payload', async () => {
    const response = await request(app).post('/login').send({
      email: 'johndoe@example.com',
      password: 'johndoepass123',
    });

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.headers['set-cookie'][0]).toMatch(/token/);
    expect(response.body.data).toEqual({ success: true });
  });
});
