import { RA } from './types';

export function expose(value: Readonly<Record<string, unknown>>) {
  // @ts-expect-error Vite has bad typing for env variables?
  if (import.meta.env.VITE_MODE !== 'development') return;

  // @ts-expect-error Defining dev-only property
  window._ ??= {};
  Object.entries(value).forEach(([key, value]) => {
    // @ts-expect-error Defining dev-only property
    window._[key] = value;
  });
}

/** Filter undefined items out of the array */
export const filterArray = <T>(array: RA<T | undefined>): RA<T> =>
  array.filter((item): item is T => item !== undefined);

export type HueComponents = readonly [
  hue: number,
  saturation: number,
  luminosity: number,
];

export const hueComponentsToColor = ([
  hue,
  saturation,
  luminosity,
]: HueComponents) => `hsl(${hue} ${saturation}% ${luminosity}%)`;

/**
 * Regular Math.random() was used for getting random shape, but the randomness
 * was often not distributed fairly - the same shape occurred too many times in
 * a row, or a shape (I) didn't occur enough.
 */
export function fairRandomItem<T>(array: readonly T[], fairness = 10): () => T {
  let possibilities = array.flatMap((item) =>
    Array.from({ length: fairness }, () => item),
  );
  return (): T => {
    const item = randomArrayItem(possibilities);
    const index = possibilities.indexOf(item);
    possibilities.splice(index, 1, randomArrayItem(array));
    return item;
  };
}

export const randomArrayItem = <T>(array: RA<T>): T =>
  array[Math.floor(Math.random() * array.length)];
