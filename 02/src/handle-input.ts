import { isKeyInObject } from './utility/is-key-in-object';
import { nameToCommand } from './name-to-command';
import { InputError } from './error/input-error';
import { OperationError } from './error/operation-error';
import { print } from './utility/print';
import { EscapeCode } from './common/escape-code';

/**
 * @throws {InputError | OperationError}
 * @todo parsed args containing space
 */
async function handleInput(input: string): Promise<void> {
  const trimedInput = input.trim();
  const separator = ' ';
  const [name, ...args] = trimedInput.split(separator);

  try {
    if (!isKeyInObject(name, nameToCommand)) {
      throw new InputError('Command');
    }

    await nameToCommand[name].execute(...args);

    print(
      `${EscapeCode.fgGreen}You are currently in ${process.cwd()}${
        EscapeCode.reset
      }`
    );
  } catch (error) {
    if (error instanceof InputError || error instanceof OperationError) {
      print(`${EscapeCode.fgRed}${error.message}${EscapeCode.reset}`);
      return;
    }

    print(
      `${EscapeCode.fgRed}${new OperationError().message}${EscapeCode.reset}`
    );
  }
}

export { handleInput };
