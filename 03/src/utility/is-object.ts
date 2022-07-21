function isObject<Obj extends object = Record<string, any>>(
  value: unknown
): value is Obj {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export { isObject };
