import { AddCommand } from './command/add-command';
import { CatCommand } from './command/cat-command';
import { CdCommand } from './command/cd-command';
import { CompressCommand } from './command/compress-command';
import { CpCommand } from './command/cp-command';
import { DecompressCommand } from './command/decompress-command';
import { HashCommand } from './command/hash-command';
import { HelpCommand } from './command/help-command';
import { LsCommand } from './command/ls-command';
import { MvCommand } from './command/mv-command';
import { OsCommand } from './command/os-command';
import { RmCommand } from './command/rm-command';
import { RnCommand } from './command/rn-command';
import { UpCommand } from './command/up-command';

const nameToCommand = {
  add: new AddCommand(),
  cat: new CatCommand(),
  cd: new CdCommand(),
  compress: new CompressCommand(),
  cp: new CpCommand(),
  decompress: new DecompressCommand(),
  hash: new HashCommand(),
  help: new HelpCommand(),
  ls: new LsCommand(),
  mv: new MvCommand(),
  os: new OsCommand(),
  rm: new RmCommand(),
  rn: new RnCommand(),
  up: new UpCommand(),
};

export { nameToCommand };
