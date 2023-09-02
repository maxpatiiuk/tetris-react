import React from "react";
import { GetSet } from "../lib/types";
import { getInitialState } from "../components/State/StateReducer";

const prefix = "tetris-react-";

/**
 * Like React.useState, but initial value is read from localStorage
 * and all changes are written back to localStorage
 *
 * @remarks
 * Useful for remembering user preference or caching async operations
 */
function useGenericCache<T>(name: string, defaultValue: T): GetSet<T> {
  const [state, setState] = React.useState<T>(() => {
    const cached = localStorage.getItem(`${prefix}${name}`);
    return cached === null ? defaultValue : JSON.parse(cached);
  });

  const setCachedState = React.useCallback(
    (newValue: T) => {
      localStorage.setItem(`${prefix}${name}`, JSON.stringify(newValue));
      setState(newValue);
    },
    [name],
  );

  React.useEffect(() => {
    globalThis.addEventListener("storage", ({ storageArea, key, newValue }) => {
      // "key" is null only when running `localStorage.clear()`
      if (
        storageArea !== globalThis.localStorage ||
        key === null ||
        !key.startsWith(prefix) ||
        newValue === null
      )
        return;
      const activeName = key.slice(prefix.length);
      if (activeName !== name) return;

      const currentValue = JSON.stringify(state);
      if (currentValue === newValue) return;

      /*
       * Safe to assume only JSON values would be in localStorage, as that's
       * what genericSet() does
       */
      setState(JSON.parse(newValue));
    });
  }, []);

  return [state, setCachedState];
}

export const useBestScore = () => useGenericCache("bestScore", 0);
export const useGameState = () =>
  useGenericCache("gameState", getInitialState());
