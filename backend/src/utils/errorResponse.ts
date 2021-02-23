import { Error } from 'mongoose';

class ErrorResponse extends Error {
  statusCode: number;
  code: number | undefined;
  value: number | undefined;
  errors: Error[] | undefined;

  constructor(
    message: string,
    statusCode: number,
    code?: number,
    value?: number,
    errors?: Error[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.value = value;
    this.errors = errors;
  }
}

export default ErrorResponse;
