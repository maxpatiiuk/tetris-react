/*
 * Configurations for the game
 */

import type { IR } from './lib/types';
import { HueComponents, fairRandomItem } from './lib/utils';

/*
 * Board size horizontal
 * NOTE: if you change this, you also need to change the className for the
 * main grid component from `grid-cols-10` to the new value
 */
export const boardX = 10;

// Board size vertical
export const boardY = 20;

// The speed at which the game ticks / the gravity acts / the blocks fall
export const initialSpeed = 1000;

// How many points to give for each competed row
export const scoreMultiplier = 100;

// Shapes to use in the game, their colors and definitions
/* eslint-disable @typescript-eslint/naming-convention */
export const shapes: IR<{
  // What color to use for the shape
  readonly color: HueComponents;
  // how does this shape look
  readonly definition: readonly (readonly ('0' | '1')[])[];
  // whether this shape can be randomly selected
  readonly spawn: boolean;
}> = {
  I: {
    // Cyan
    color: [180, 100, 50],
    definition: [['1'], ['1'], ['1'], ['1']],
    spawn: true,
  },
  O: {
    // Light blue
    color: [200, 100, 50],
    definition: [
      ['1', '1'],
      ['1', '1'],
    ],
    spawn: true,
  },
  T: {
    // Purple
    color: [300, 100, 50],
    definition: [
      ['1', '0'],
      ['1', '1'],
      ['1', '0'],
    ],
    spawn: true,
  },
  S: {
    // Green
    color: [120, 100, 50],
    definition: [
      ['0', '1', '1'],
      ['1', '1', '0'],
    ],
    spawn: true,
  },
  J: {
    // Blue
    color: [240, 100, 50],
    definition: [
      ['1', '0', '0'],
      ['1', '1', '1'],
    ],
    spawn: true,
  },
  Z: {
    // Red
    color: [0, 100, 50],
    definition: [
      ['1', '1', '0'],
      ['0', '1', '1'],
    ],
    spawn: true,
  },
  L: {
    // Orange
    color: [38.82, 100, 50],
    definition: [
      ['1', '0'],
      ['1', '0'],
      ['1', '1'],
    ],
    spawn: true,
  },
  // Empty cell
  _: {
    // Black
    color: [0, 0, 0],
    definition: [],
    spawn: false,
  },
  /* eslint-enable @typescript-eslint/naming-convention */
  /* eslint-enable id-length */
} as const;

export const shapeRandomizer = fairRandomItem<keyof typeof shapes>(
  Object.entries(shapes)
    .filter(([, { spawn }]) => spawn)
    .map(([shapeName]) => shapeName),
);

export type Shape = keyof typeof shapes;
