function notNull<Val>(value: Val | null): value is Val {
  return value !== null;
}

export { notNull };
