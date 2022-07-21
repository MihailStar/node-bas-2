/**
 * for `--key=value`
 */
function getСliOptions(): Record<string, string | undefined> {
  const { argv: СommandLineArguments } = process;
  const options: Record<string, string> = {};

  for (let index = 2; index < СommandLineArguments.length; index += 1) {
    const optionPrefix = '--';
    const optionSeparator = '=';
    const optionСandidate = СommandLineArguments[index];

    if (
      RegExp(`^${optionPrefix}.+${optionSeparator}.+$`).test(optionСandidate)
    ) {
      const [key, value] = optionСandidate.split(optionSeparator);

      options[key.slice(optionPrefix.length)] = value;
    }
  }

  return options;
}

export { getСliOptions };
