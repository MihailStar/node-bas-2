type FilterKeysByType<Obj extends object, Type> = {
  [Key in keyof Obj]: Obj[Key] extends Type ? Key : never;
}[keyof Obj];

type DbId = { _id: string };

type WithDbId<Obj extends object> = Obj & DbId;

type SchemeId = { id: string };

type WithSchemeId<Obj extends object> = Obj & SchemeId;

type MappedKeys<Obj extends object, Map extends Record<keyof Obj, string>> = {
  [Key in keyof Obj as Map[Key] extends string ? Map[Key] : Key]: Obj[Key];
};

type WithPagination<Obj extends object> = {
  items: Obj[];
  offset: number;
  limit: number;
  total: number;
};

export {
  FilterKeysByType,
  DbId,
  WithDbId,
  SchemeId,
  WithSchemeId,
  MappedKeys,
  WithPagination,
};
