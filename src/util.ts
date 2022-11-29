import { ValidationError } from 'class-validator';
import { ValidationErrorMessage } from './interfaces/validationErrorMessage';

export const serializeValidationError = (err: ValidationError):
  ValidationErrorMessage => {
  const messages: string[] = [];
  for (const key in err.constraints) {
    messages.push(err.constraints[key]);
  }
  return {
    field: err.property,
    messages: messages,
  };
};
