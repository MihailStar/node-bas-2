import { InputError } from '../error/input-error';
import { OperationError } from '../error/operation-error';
import { isError } from '../utility/is-error';

abstract class AbstractCommand {
  validateArgs(...args: string[]): boolean {
    if (args.length === this.executor.length) {
      return true;
    }

    return false;
  }

  /**
   * @throws {InputError | OperationError}
   */
  async execute(...args: string[]): Promise<void> {
    const isArgsValid = this.validateArgs(...args);

    if (!isArgsValid) {
      throw new InputError('Arguments');
    }

    try {
      await this.executor(...args);
    } catch (error) {
      if (error instanceof InputError || error instanceof OperationError) {
        throw error;
      }

      if (isError(error) && typeof error.code === 'string') {
        throw new OperationError(`Code ${error.code}`);
      }

      throw new OperationError();
    }
  }

  /**
   * @protected
   */
  protected abstract executor(...args: string[]): Promise<void>;
}

export { AbstractCommand };
