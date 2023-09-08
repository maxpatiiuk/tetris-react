/*
 * Action's reducer
 */

import type { Shape } from '../../config';
import { boardX, boardY, shapes } from '../../config';
import type { RA } from '../../lib/types';
import { moveShape } from './transformShapes';
import type { GameState } from './types';
import { Direction } from './types';
import { spawnNewShape, updateBoard } from './utils';

export const reducers = {
  initial: (): GameState => ({
    board: Array.from<RA<Shape>>({ length: boardY }).fill(
      Array.from<Shape>({ length: boardX }).fill('_'),
    ),
    currentShapeLocation: {},
    currentShape: '_',
    nextShape: '_',
    score: 0,
    isPaused: false,
  }),

  togglePause: (state: GameState): GameState => ({
    ...state,
    isPaused: !state.isPaused,
  }),

  move: (state: GameState, direction: Direction): GameState =>
    Object.keys(state.currentShapeLocation).length === 0 ||
    (state.isPaused &&
      // Don't cheat :)
      direction !== Direction.DOWN)
      ? state
      : updateBoard(
          state,
          moveShape(
            state.currentShapeLocation,
            direction,
            state.isPaused ? -1 : 1,
          ),
        ),

  gravity(state: GameState, seed: number): GameState | undefined {
    if (state.isPaused) return state;

    const shapeNames = Object.entries(shapes)
      .filter(([, { spawn }]) => spawn)
      .map(([shapeName]) => shapeName);

    const nextShape =
      state.nextShape === '_'
        ? shapeNames[seed % shapeNames.length]
        : state.nextShape;

    const newState: GameState = {
      ...state,
      nextShape,
    };

    return Object.keys(newState.currentShapeLocation).length === 0
      ? spawnNewShape(newState)
      : updateBoard(
          newState,
          moveShape(newState.currentShapeLocation, Direction.DOWN),
        );
  },
} as const;
