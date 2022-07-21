import { arch, cpus as osCpus, EOL, homedir as osHomedir, userInfo } from 'os';
import { Constant } from '../common/constant';
import { print } from '../utility/print';
import { AbstractCommand } from './abstract-command';

const MHZ_IN_GHZ = 1000;

function architecture(): string {
  return arch();
}

function cpus(): string {
  const processors = osCpus();
  let result = '';

  result += `Overall amount: ${processors.length}${EOL}`;
  result += processors
    .map(
      ({ model, speed: speedInMHz }) =>
        `${model} | ${speedInMHz / MHZ_IN_GHZ} GHz`
    )
    .join(EOL);

  return result;
}

function homedir(): string {
  /* return userInfo().homedir; // from OS */
  return osHomedir();
}

function username(): string {
  try {
    return userInfo().username;
  } catch {
    return Constant.UNKNOWN_OS_USER;
  }
}

function eol(): string {
  return JSON.stringify(EOL).slice(1, -1);
}

const options = [
  '--architecture',
  '--cpus',
  '--homedir',
  '--username',
  '--EOL',
] as const;
type Option = typeof options[Exclude<keyof typeof options, keyof []>];

class OsCommand extends AbstractCommand {
  override validateArgs(...args: string[]): boolean {
    if (!super.validateArgs(...args)) {
      return false;
    }
    if (args.some((arg) => !args.includes(arg as Option))) {
      return false;
    }

    return true;
  }

  protected async executor(option: Option): Promise<void> {
    const result = ((): string => {
      switch (option) {
        case '--architecture':
          return architecture();
        case '--cpus':
          return cpus();
        case '--homedir':
          return homedir();
        case '--username':
          return username();
        case '--EOL':
          return eol();
        default:
          const exhaustiveCheck: never = option;

          return exhaustiveCheck;
      }
    })();

    print(result);
  }
}

export { OsCommand };
