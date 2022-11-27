import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { dataSource } from '../data-source';
import { User } from '../entities/user';

@ValidatorConstraint({ name: 'unique', async: true })
export class EmailUnique implements ValidatorConstraintInterface {
  async validate(email: string) {
    const userRepo = dataSource.getRepository(User);
    return (await userRepo.findOneBy({ email: email })) == null;
  }

  defaultMessage() {
    return 'email has been already used.';
  }
}
