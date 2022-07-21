import { CustomError } from './custom-error';

class InputError extends CustomError {
  constructor(description?: string) {
    super(
      `Invalid input${
        typeof description === 'string' ? `. ${description}` : ''
      }`
    );
  }
}

export { InputError };
