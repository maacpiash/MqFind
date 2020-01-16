export interface IDictionary<T> {
  [key: string]: T
}

export type Dictionary = IDictionary<string | string[]>
