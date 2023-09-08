/*
 * State Reducer
 */

import type { Shape } from '../../config';
import type { RA, RR } from '../../lib/types';

export type ShapeLocationWritable = Record<number, Record<number, boolean>>;
export type ShapeLocation = RR<number, RR<number, boolean>>;

export type GameState = {
  readonly board: RA<RA<Shape>>;
  readonly score: number;
  readonly currentShape: Shape;
  readonly currentShapeLocation: ShapeLocation;
  readonly nextShape: Shape;
  readonly isPaused: boolean;
};

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}
