import { createInterface } from 'readline';
import { homedir } from 'os';
import { getСliOptions } from './utility/get-cli-options-2';
import { Constant } from './common/constant';
import { handleInput } from './handle-input';
import { print } from './utility/print';
import { EscapeCode } from './common/escape-code';

const username = getСliOptions()['username'] ?? Constant.UNKNOWN_CLI_USER;

const io = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
})
  .on('line', (input) => {
    const trimedInput = input.trim();

    if (trimedInput === Constant.EXIT) {
      io.close();
      return;
    }

    handleInput(trimedInput).finally(() => {
      io.prompt();
    });
  })
  .on('SIGINT', () => {
    print();
    io.close();
  })
  .on('close', () => {
    print(`Thank you for using File Manager, ${username}!`);

    process.nextTick(() => {
      process.exit();
    });
  });

process.chdir(homedir());

print(
  `Welcome to the File Manager, ${username}!`,
  `${EscapeCode.fgGreen}You are currently in ${process.cwd()}${
    EscapeCode.reset
  }`
);

io.prompt();
