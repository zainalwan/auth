import { ValidationError } from 'class-validator';

interface ValidationErrorMessage {
  field: string,
  messages?: string[],
}

export const serializeValidationError = (err: ValidationError): ValidationErrorMessage => {
  const messages: string[] = [];
  for (const key in err.constraints) {
    messages.push(err.constraints[key]);
  }
  return {
    field: err.property,
    messages: messages,
  };
};
