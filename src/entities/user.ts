import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  Validate,
} from 'class-validator';
import { EmailUnique } from '../validators/emailUnique';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  @IsNotEmpty({ message: 'firstName is required.' })
  @IsString({ message: 'firstName must be a string.' })
  firstName: string;

  @Column({
    name: 'last_name',
    length: 30,
    nullable: false,
  })
  @IsNotEmpty({ message: 'lastName is required.' })
  @IsString({ message: 'lastName must be a string.' })
  lastName: string;

  @Column({
    name: 'email',
    length: 50,
    nullable: false,
    unique: true,
  })
  @IsNotEmpty({ message: 'email is required.' })
  @IsEmail()
  @Validate(EmailUnique)
  email: string;

  @Column({
    name: 'password',
    length: 100,
    nullable: false,
  })
  @IsNotEmpty({ message: 'password is required.' })
  @MinLength(12, { message: 'password must be at least 12 characters.' })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
  })
  deletedAt: Date;
}
