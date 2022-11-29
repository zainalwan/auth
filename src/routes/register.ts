import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { dataSource } from '../dataSource';
import { User } from '../entities/user';
import { serializeValidationError } from '../util';
import { RegisterPayload } from '../interfaces/registerPayload';

export const router = express.Router();

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
