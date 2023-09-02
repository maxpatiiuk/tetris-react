/*
 * State Reducer
 */

import { RA, RR } from '../../lib/types';
import { Shape } from '../../config';

export type ShapeLocationWritable = Record<number, Record<number, boolean>>;
export type ShapeLocation = RR<number, RR<number, boolean>>;

export type GameState = {
  board: RA<RA<Shape>>;
  score: number;
  currentShape: Shape;
  currentShapeLocation: ShapeLocation;
  nextShape: Shape;
  paused: boolean;
};

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}
