import { CustomError } from './custom-error';

class OperationError extends CustomError {
  constructor(description?: string) {
    super(
      `Operation failed${
        typeof description === 'string' ? `. ${description}` : ''
      }`
    );
  }
}

export { OperationError };
