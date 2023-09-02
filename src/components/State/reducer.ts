/*
 * Action's reducer
 */

import { moveShape } from './transformShapes';
import { spawnNewShape, updateBoard } from './utils';
import { Shape, boardX, boardY, shapes } from '../../config';
import { Direction, GameState } from './types';
import { RA } from '../../lib/types';

export const reducers = {
  initial: (): GameState => ({
    board: Array.from<RA<Shape>>({ length: boardY }).fill(
      Array.from<Shape>({ length: boardX }).fill('_'),
    ),
    currentShapeLocation: {},
    currentShape: '_',
    nextShape: '_',
    score: 0,
    paused: false,
  }),

  togglePause: (state: GameState): GameState => ({
    ...state,
    paused: !state.paused,
  }),

  move: (state: GameState, direction: Direction): GameState =>
    Object.keys(state.currentShapeLocation).length === 0 ||
    (state.paused &&
      // Don't cheat :)
      direction !== Direction.DOWN)
      ? state
      : updateBoard(
          state,
          moveShape(
            state.currentShapeLocation,
            direction,
            state.paused ? -1 : 1,
          ),
        ),

  gravity(state: GameState, seed: number): GameState | undefined {
    if (state.paused) return state;

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
