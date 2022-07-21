function isInteger(value: unknown): value is number {
  return Number.isInteger(value);
}

export { isInteger };
