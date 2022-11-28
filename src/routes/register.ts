import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { dataSource } from '../data-source';
import { User } from '../entities/user';
import { serializeValidationError } from '../util';

export const router = express.Router();

interface RegisterPayload {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

router.post('/', async (req: Request, res: Response) => {
  const payload: RegisterPayload = req.body;
  const userRepo: Repository<User> = dataSource.getRepository(User);

  const user: User = new User();
  user.firstName = payload.firstName;
  user.lastName = payload.lastName;
  user.email = payload.email;
  user.password = payload.password;

  try {
    await validateOrReject(user);
  } catch (errors) {
    return res.status(400).send({
      data: {
        success: false,
        errors: errors.map(serializeValidationError),
      },
    });
  }

  const salt: string = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await userRepo.save(user);

  return res.send({
    data: {
      success: true,
    },
  });
});
