/*
 * Action's reducer
 */

import type { Shape } from '../../config';
import { boardX, boardY } from '../../config';
import type { RA } from '../../lib/types';
import { moveShape } from './transformShapes';
import type { GameState } from './types';
import { Direction } from './types';
import { spawnNewShape, updateBoard } from './utils';

export const reducers = {
  initial: (nextShapes: RA<Shape>): GameState => ({
    board: Array.from<RA<Shape>>({ length: boardY }).fill(
      Array.from<Shape>({ length: boardX }).fill('_'),
    ),
    currentShapeLocation: {},
    currentShape: '_',
    nextShapes,
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

  hardDrop(state: GameState): GameState {
    let previousState = state;
    let localState = state;
    while (Object.keys(previousState.currentShapeLocation).length > 0) {
      previousState = localState;
      localState = reducers.move(previousState, Direction.DOWN);
    }
    return localState;
  },

  gravity(
    state: GameState,
    nextShape: Shape,
  ): GameState & { readonly isGameOver?: boolean } {
    if (state.isPaused) return state;

    return Object.keys(state.currentShapeLocation).length === 0
      ? spawnNewShape(state, nextShape)
      : updateBoard(
          state,
          moveShape(state.currentShapeLocation, Direction.DOWN),
        );
  },
} as const;
