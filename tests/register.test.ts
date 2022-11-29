import request from 'supertest';
import { Repository } from 'typeorm';
import { app } from '../src/app';
import { dataSource } from '../src/data-source';
import { User } from '../src/entities/user';

describe('POST /register', () => {
  const userRepo: Repository<User> = dataSource.getRepository(User);

  beforeAll(async () => await dataSource.initialize());
  afterAll(async () => await dataSource.destroy());
  afterEach(async () => await userRepo.clear());

  it('invalid payload', async () => {
    const response = await request(app).post('/register').send();

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.data.success).toBeFalsy();
    expect(response.body.data.errors.length).toBe(4);
    expect((await userRepo.find()).length).toBe(0);
  });

  it('unique email', async () => {
    const user: User = new User();
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.email = 'johndoe@example.com';
    user.password = 'johndoepass123';
    userRepo.save(user);

    const response = await request(app).post('/register').send({
      firstName: 'The Fake',
      lastName: 'John Doe',
      email: 'johndoe@example.com',
      password: 'thefakejohndoepass123',
    });

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.data.success).toBeFalsy();
    expect(response.body.data.errors.length).toBe(1);
    expect(response.body.data.errors[0].field).toBe('email');
    expect((await userRepo.find()).length).toBe(1);
  });

  it('valid payload', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'johndoepass123',
    });
    const john: User | null = await userRepo.findOneBy({
      email: 'johndoe@example.com',
    });

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.data).toEqual({ success: true });
    expect(john).toBeTruthy();
    expect(john?.password).not.toBe('johndoepass123');
  });
});
