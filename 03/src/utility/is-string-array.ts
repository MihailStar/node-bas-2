import { isString } from './is-string';

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

export { isStringArray };
