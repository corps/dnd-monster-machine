import {useCallback, useState} from "react";

export type Cell<T> = null | [T]
export function useCell<T>(): [Cell<T>, (t: T) => void] {
  const [cell, setCell] = useState(null as null | [T]);
  const setV = useCallback((v: T) => setCell([v]), [setCell]);
  return [cell, setV];
}

export function bimap<T, R>(
  cell: Cell<T>,
  f: (t: T) => R,
  d: () => R
): R {
  if(cell) {
    return f(cell[0]);
  }

  return d();
}