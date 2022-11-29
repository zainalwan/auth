import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ValidationError } from 'class-validator';
import { dataSource } from '../dataSource';
import { User } from '../entities/user';
import { serializeValidationError } from '../util';
import { LoginPayload } from '../interfaces/loginPayload';
import { ValidationErrorMessage } from '../interfaces/validationErrorMessage';
import jsonwebtoken from 'jsonwebtoken';

export const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const payload: LoginPayload = req.body;
  const userRepo: Repository<User> = dataSource.getRepository(User);

  if (payload.email == undefined) {
    const error: ValidationErrorMessage = {
      field: 'email',
      messages: ['email is required.'],
    };
    return res.status(400).send({
      data: {
        success: false,
        errors: [error],
      },
    });
  } else {
    const user: User | null = await userRepo.findOneBy({
      email: payload.email,
    });
    if (user == null) {
      const error: ValidationErrorMessage = {
        field: 'email',
        messages: ['email is not registered.'],
      };
      return res.status(400).send({
        data: {
          success: false,
          errors: [error],
        },
      });
    } else {
      const correctPassword = await bcrypt.compare(
        payload.password,
        user.password,
      );
      if (!correctPassword) {
        const error: ValidationErrorMessage = {
          field: 'password',
          messages: ['incorrect password.'],
        };
        return res.status(400).send({
          data: {
            success: false,
            errors: [error],
          },
        });
      } else {
        const token = await jsonwebtoken.sign({a: 'b'}, 'asd');
        return res.cookie('token', token).send({
          data: {
            success: true,
          },
        });
      }
    }
  }
});
