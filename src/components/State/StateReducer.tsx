/*
 * State Reducer
 */

import { RA, RR } from '../../lib/types';
import { boardX, boardY, Shape } from '../../config';

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

export const getInitialState = (): GameState => ({
  board: Array.from<RA<Shape>>({ length: boardY }).fill(
    Array.from<Shape>({ length: boardX }).fill('_'),
  ),
  currentShapeLocation: {},
  currentShape: '_',
  nextShape: '_',
  score: 0,
  paused: false,
});
