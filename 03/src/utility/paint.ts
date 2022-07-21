const fontColorToCode = {
  fontBlack: '\x1b[30m',
  fontRed: '\x1b[31m',
  fontGreen: '\x1b[32m',
  fontYellow: '\x1b[33m',
  fontBlue: '\x1b[34m',
  fontMagenta: '\x1b[35m',
  fontCyan: '\x1b[36m',
  fontWhite: '\x1b[37m',
} as const;
type FontColor = keyof typeof fontColorToCode;

const backgroundColorToCode = {
  backgroundBlack: '\x1b[40m',
  backgroundRed: '\x1b[41m',
  backgroundGreen: '\x1b[42m',
  backgroundYellow: '\x1b[43m',
  backgroundBlue: '\x1b[44m',
  backgroundMagenta: '\x1b[45m',
  backgroundCyan: '\x1b[46m',
  backgroundWhite: '\x1b[47m',
} as const;
type BackgroundColor = keyof typeof backgroundColorToCode;

const colorToCode = {
  reset: '\x1b[0m',
  reverse: '\x1b[7m',
  ...fontColorToCode,
  ...backgroundColorToCode,
} as const;
type Color = Exclude<keyof typeof colorToCode, 'reset'>;

function paint(string: string, color: 'reverse'): string;
function paint(string: string, color: FontColor): string;
function paint(string: string, ...colors: [FontColor, BackgroundColor]): string;
function paint(string: string, color: BackgroundColor): string;
function paint(string: string, ...colors: [BackgroundColor, FontColor]): string;

function paint(string: string, ...colors: Color[]): string {
  const codes = colors.map((color) => colorToCode[color]);

  return `${codes.join()}${string}${colorToCode.reset}`;
}

export { paint };
