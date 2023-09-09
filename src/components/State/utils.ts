import type { Shape } from '../../config';
import { boardX, boardY, scoreMultiplier, shapes } from '../../config';
import type { RA } from '../../lib/types';
import { flattenShape } from './transformShapes';
import type { GameState, ShapeLocation, ShapeLocationWritable } from './types';

export function spawnNewShape(
  state: GameState,
  nextShape: Shape,
): GameState & { readonly isGameOver: boolean } {
  const shapeDefinition = shapes[state.nextShape].definition;
  const shapeWidth = shapeDefinition[0].length;
  const shapeOffset = Math.round((boardX - shapeWidth) / 2);

  const isGameOver = state.board.some((row, rowIndex) =>
    row.some(
      (cell, cellIndex) =>
        shapeDefinition[rowIndex]?.[cellIndex - shapeOffset] === '1' &&
        cell !== '_',
    ),
  );

  const currentShapeLocation: ShapeLocationWritable = {};

  function updateCurrentShape(rowIndex: number, cellIndex: number) {
    currentShapeLocation[rowIndex] ??= {};
    currentShapeLocation[rowIndex][cellIndex] = true;
    return state.nextShape;
  }

  return {
    ...state,
    isGameOver,
    currentShape: state.nextShape,
    nextShape,
    currentShapeLocation,
    board: state.board.map((row, rowIndex) =>
      row.map((cell, cellIndex) =>
        shapeDefinition[rowIndex]?.[cellIndex - shapeOffset] === '1'
          ? updateCurrentShape(rowIndex, cellIndex)
          : cell,
      ),
    ),
  };
}

export function updateBoard(
  state: GameState,
  newShapeLocation: ShapeLocation,
): GameState {
  if (flattenShape(newShapeLocation).some(([, x]) => x < 0 || x >= boardX))
    return state;

  return (
    // Shape is at the bottom
    flattenShape(newShapeLocation).some(([y]) => y >= boardY) ||
      // Shape overlaps with another shape
      state.board.some((row, rowIndex) =>
        row.some(
          (cell, cellIndex) =>
            newShapeLocation[rowIndex]?.[cellIndex] &&
            !state.currentShapeLocation[rowIndex]?.[cellIndex] &&
            cell !== '_',
        ),
      )
      ? // Place shape
        removeCompletedRows(
          {
            ...state,
            currentShapeLocation: {},
          },
          findCompletedRows(state.board),
        )
      : // Move shape down
        {
          ...state,
          currentShapeLocation: newShapeLocation,
          board: state.board.map((row, rowIndex) =>
            row.map((cell, cellIndex) =>
              newShapeLocation[rowIndex]?.[cellIndex]
                ? state.currentShape
                : state.currentShapeLocation[rowIndex]?.[cellIndex]
                ? '_'
                : cell,
            ),
          ),
        }
  );
}

const removeCompletedRows = (
  state: GameState,
  rowsToRemove: readonly number[],
): GameState =>
  rowsToRemove.length === 0
    ? state
    : {
        ...state,
        /*
         * Yes! Score growth exponentially!
         * Though, speed increases as the score grows...
         */
        score: (state.score + scoreMultiplier * 2) ^ (rowsToRemove.length - 1),
        board: [
          ...Array.from<RA<Shape>>({ length: rowsToRemove.length }).fill(
            new Array(boardX).fill('_'),
          ),
          ...state.board.filter((_, index) => !rowsToRemove.includes(index)),
        ],
      };

const findCompletedRows = (board: RA<RA<Shape>>): readonly number[] =>
  board
    .map((row, index) => ({
      isCompleted: row.every((cell) => cell !== '_'),
      index,
    }))
    .filter(({ isCompleted }) => isCompleted)
    .map(({ index }) => index);
