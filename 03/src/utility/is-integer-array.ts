import { isInteger } from './is-integer';

function isIntegerArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(isInteger);
}

export { isIntegerArray };
