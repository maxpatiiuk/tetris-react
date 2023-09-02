import { Direction } from './types';
import { ShapeLocation } from './StateReducer';
import { RA } from '../../lib/types';

export const flattenShape = (shape: ShapeLocation): RA<RA<number>> =>
  Object.entries(shape).flatMap(([rowIndex, row]) =>
    Object.keys(row).map((colIndex) => [
      Number.parseInt(rowIndex),
      Number.parseInt(colIndex),
    ]),
  );

export const moveShape = (
  currentShapeLocation: ShapeLocation,
  direction: Direction,
  multiplier = 1,
): ShapeLocation =>
  direction === Direction.UP
    ? rotateShape(currentShapeLocation, multiplier)
    : Object.fromEntries(
        Object.entries(currentShapeLocation).map(([rowIndex, row]) => [
          direction === Direction.DOWN
            ? Number.parseInt(rowIndex) + multiplier
            : rowIndex,
          direction === Direction.DOWN
            ? row
            : Object.fromEntries(
                Object.keys(row).map((colIndex) => [
                  Number.parseInt(colIndex) +
                    (direction === Direction.RIGHT ? 1 : -1) * multiplier,
                  true,
                ]),
              ),
        ]),
      );

const rotateShape = (shape: ShapeLocation, multiplier = 1): ShapeLocation =>
  editShape(shape, (shape) =>
    autoStripShape(
      matrixToShape(rotateMatrixTimes(multiplier, shapeToMatrix(shape))),
    ),
  );

const editShape = (
  shape: ShapeLocation,
  callback: (shape: ShapeLocation) => ShapeLocation,
) =>
  [shape]
    .map((shape) => ({
      shape,
      shapeXOffset: getShapeOffset(shape, 'x'),
      shapeYOffset: getShapeOffset(shape, 'y'),
    }))
    .map(({ shape, shapeXOffset, shapeYOffset }) =>
      padShape(
        callback(stripShape(shape, shapeXOffset, shapeYOffset)),
        shapeXOffset,
        shapeYOffset,
      ),
    )[0];

const getShapeOffset = (shape: ShapeLocation, direction: 'x' | 'y') =>
  getMinArrayValue(
    (direction === 'x'
      ? Object.values(shape).flatMap((row) => Object.keys(row))
      : Object.keys(shape)
    ).map((value) => Number.parseInt(value)),
  );

const getMinArrayValue = (array: readonly number[]): number =>
  array.reduce(
    (min, value) => (Number.isNaN(min) || value < min ? value : min),
    Number.NaN,
  );

const padShape = (shape: ShapeLocation, xOffset: number, yOffset: number) =>
  moveShape(
    moveShape(shape, Direction.DOWN, yOffset),
    Direction.RIGHT,
    xOffset,
  );

const stripShape = (shape: ShapeLocation, xOffset: number, yOffset: number) =>
  moveShape(
    moveShape(shape, Direction.DOWN, -yOffset),
    Direction.LEFT,
    xOffset,
  );

const autoStripShape = (shape: ShapeLocation) =>
  stripShape(shape, getShapeOffset(shape, 'x'), getShapeOffset(shape, 'y'));

const matrixToShape = (
  matrix: readonly (readonly (0 | 1)[])[],
): ShapeLocation =>
  Object.fromEntries(
    matrix
      .map((row, rowIndex) => [
        rowIndex,
        Object.fromEntries(
          row
            .map((cell, cellIndex) => ({
              cell,
              cellIndex,
            }))
            .filter(({ cell }) => cell)
            .map(({ cellIndex }) => [cellIndex, true]),
        ),
      ])
      .filter(([, row]) => Object.keys(row).length > 0),
  );

const rotateMatrixTimes = <T>(times: number, matrix: RA<RA<T>>) =>
  Array.from(new Array(times % 4)).reduce<RA<RA<T>>>(
    (matrix) => rotateMatrix(matrix),
    matrix,
  );

const rotateMatrix = <T>(matrix: RA<RA<T>>): RA<RA<T>> =>
  reverseMatrix(transposeMatrix(matrix));

const transposeMatrix = <T>(matrix: RA<RA<T>>) =>
  matrix[0].map((_, index) => matrix.map((row) => row[index]));

const reverseMatrix = <T>(matrix: RA<RA<T>>) =>
  matrix.map((row) => row.slice().reverse());

const shapeToMatrix = (shape: ShapeLocation): (0 | 1)[][] =>
  [shape]
    .map((shape) => ({
      shape,
      size: Math.max(getShapeSize(shape, 'x'), getShapeSize(shape, 'y')),
    }))
    .map(({ shape, size }) =>
      Array.from(new Array(size)).reduce(
        (array, _, rowIndex) => [
          ...array,
          Array.from(new Array(size)).reduce(
            (array, _, colIndex) => [
              ...array,
              shape[rowIndex]?.[colIndex] ? 1 : 0,
            ],
            [],
          ),
        ],
        [],
      ),
    )[0];

const getShapeSize = (shape: ShapeLocation, direction: 'x' | 'y'): number =>
  getMaxArrayValue(
    (direction === 'y'
      ? Object.keys(shape)
      : Object.values(shape).flatMap((row) => Object.keys(row))
    ).map((value) => Number.parseInt(value) + 1),
  );

const getMaxArrayValue = (array: readonly number[]): number =>
  array.reduce(
    (max, value) => (Number.isNaN(max) || value > max ? value : max),
    Number.NaN,
  );
