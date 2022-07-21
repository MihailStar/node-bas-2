import { AbstractCommand } from './abstract-command';
import { print } from '../utility/print';

class HelpCommand extends AbstractCommand {
  protected async executor(): Promise<void> {
    const commandList = `
help

up
cd <path_to_directory>
ls

cat <path_to_file>
add <path_to_file>
rn <path_to_file> <path_to_new_file>
cp <path_to_file> <path_to_new_directory>
mv <path_to_file> <path_to_new_directory>
rm <path_to_file>

os --EOL | --cpus | --homedir | --username | --architecture

hash <path_to_file>

compress <path_to_file> <path_to_new_file>
decompress <path_to_file> <path_to_new_file>

.exit
`;

    print(commandList.trim());
  }
}

export { HelpCommand };
