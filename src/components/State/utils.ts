import { boardX, boardY, scoreMultiplier, shapes, Shape } from "../../config";
import { RA } from "../../lib/types";
import {
  GameState,
  ShapeLocation,
  ShapeLocationWritable,
} from "./StateReducer";
import { flattenShape } from "./transformShapes";

export function spawnNewShape(state: GameState): GameState | undefined {
  const shapeDefinition = shapes[state.nextShape].definition;
  const shapeWidth = shapeDefinition[0].length;
  const shapeOffset = Math.round((boardX - shapeWidth) / 2);

  if (
    state.board.some((row, rowIndex) =>
      row.some(
        (cell, cellIndex) =>
          shapeDefinition[rowIndex]?.[cellIndex - shapeOffset] === "1" &&
          cell !== "_",
      ),
    )
  )
    return undefined;

  const currentShapeLocation: ShapeLocationWritable = {};

  // Probably the most impure function in this entire game
  function updateCurrentShape(rowIndex: number, cellIndex: number) {
    if (!(rowIndex in currentShapeLocation))
      currentShapeLocation[rowIndex] = {};
    if (!(cellIndex in currentShapeLocation[rowIndex]))
      currentShapeLocation[rowIndex][cellIndex] = true;

    return state.nextShape;
  }

  return {
    ...state,
    currentShape: state.nextShape,
    nextShape: "_",
    currentShapeLocation,
    board: state.board.map((row, rowIndex) =>
      row.map((cell, cellIndex) =>
        shapeDefinition[rowIndex]?.[cellIndex - shapeOffset] === "1"
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
            cell !== "_",
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
                ? "_"
                : cell,
            ),
          ),
        }
  );
}

const removeCompletedRows = (
  state: GameState,
  rowsToRemove: number[],
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
          ...new Array(rowsToRemove.length).fill(new Array(boardX).fill("_")),
          ...state.board.filter((_, index) => !rowsToRemove.includes(index)),
        ],
      };

const findCompletedRows = (board: RA<RA<Shape>>): number[] =>
  board
    .map((row, index) => ({
      isCompleted: row.every((cell) => cell !== "_"),
      index,
    }))
    .filter(({ isCompleted }) => isCompleted)
    .map(({ index }) => index);
