import request from 'supertest';
import { app } from '../src/app';
import { dataSource } from '../src/data-source';
import { entities } from '../src/entities';
import { User } from '../src/entities/user';

describe('POST /register', () => {
  beforeAll(async () => {
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  afterEach(async () => {
    for (const entity of entities) {
      const repo = dataSource.getRepository(entity);
      await repo.clear();
    }
  });

  it('valid payload', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'johndoepass',
      });
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.data).toEqual({ success: true });

    const userRepo = dataSource.getRepository(User);
    const john = await userRepo.findOneBy({ email: 'johndoe@example.com'});
    expect(john).toBeTruthy();
  });
});
