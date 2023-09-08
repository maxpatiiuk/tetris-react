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
