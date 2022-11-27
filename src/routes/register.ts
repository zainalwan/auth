import express, { Request, Response } from 'express';
import { dataSource } from '../data-source';
import { User } from '../entities/user';

export const router = express.Router();

interface RegisterPayload {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

router.post('/', (req: Request, res: Response) => {
  const payload: RegisterPayload = req.body;
  const userRepo = dataSource.getRepository(User);
  const user = new User();
  user.firstName = payload.firstName;
  user.lastName = payload.lastName;
  user.email = payload.email;
  user.password = payload.password;
  userRepo.save(user);

  res.send({
    data: {
      success: true
    }
  });
});
