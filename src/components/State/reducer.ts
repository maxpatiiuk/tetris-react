/*
 * Action's reducer
 */

import { Direction } from './types';
import { moveShape } from './transformShapes';
import { spawnNewShape, updateBoard } from './utils';
import { shapes } from '../../config';
import { GameState, getInitialState } from './StateReducer';

export const reducers = {
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
  restart: getInitialState,
  togglePause: (state: GameState): GameState => ({
    ...state,
    paused: !state.paused,
  }),
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
