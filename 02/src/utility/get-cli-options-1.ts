/**
 * for `--key value`
 */
function getСliOptions(): Record<string, string | undefined> {
  const { argv: СommandLineArguments } = process;
  const options: Record<string, string> = {};

  for (let index = 2; index < СommandLineArguments.length; index += 1) {
    const propertyPrefix = '--';
    const propertyСandidate = СommandLineArguments[index];
    const valueСandidate = СommandLineArguments[index + 1] as
      | string
      | undefined;

    if (
      propertyСandidate.startsWith(propertyPrefix) &&
      typeof valueСandidate === 'string'
    ) {
      options[propertyСandidate.slice(propertyPrefix.length)] = valueСandidate;
      index += 1;
    }
  }

  return options;
}

export { getСliOptions };
