export type Constructor<Args extends Array<any>,
  ReturnType extends object = object> = new (...args: Args) => ReturnType;

export type FilteredKeys<TObject extends object, KeyType> = {
  [TKey in keyof TObject]: TObject[TKey] extends KeyType ? TKey : never
}[keyof TObject];
