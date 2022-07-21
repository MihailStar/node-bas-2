import 'dotenv/config';

const environmentVariableKeys = ['NODE_ENV', 'PORT'] as const;

type EnvironmentVariableKey = typeof environmentVariableKeys[Exclude<
  keyof typeof environmentVariableKeys,
  keyof []
>];
type EnvironmentVariables = Record<EnvironmentVariableKey, string>;

const dictionary: Partial<EnvironmentVariables> = {};

environmentVariableKeys.forEach((environmentVariableKey) => {
  const environmentVariableValue = process.env[environmentVariableKey];

  if (typeof environmentVariableValue !== 'string')
    throw new Error(`Environment variable ${environmentVariableKey} not found`);

  dictionary[environmentVariableKey] = environmentVariableValue;
});

const environmentVariables = dictionary as EnvironmentVariables;
const configuration = {
  ...environmentVariables,
  isDevelopment: environmentVariables.NODE_ENV === 'development',
} as const;

export { configuration };
