import type Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import type SceneView from '@arcgis/core/views/SceneView';

import { expose, filterArray } from '../../lib/utils';
import type { RA } from '../../lib/types';
import { GraphicWithType, displayBox, rotateGraphic, updateBox } from './box';
import { rotateCamera } from './camera';
import React from 'react';
import { Shape, boardX, boardY } from '../../config';

export function useMovement(
  view: SceneView | undefined,
  board: RA<RA<Shape>>,
  isAnimated: boolean,
  isPaused: boolean,
): void {
  const controls = React.useMemo(
    () => (view === undefined ? undefined : startMovement(view, isAnimated)),
    [view, isAnimated],
  );

  React.useEffect(() => {
    if (controls === undefined || !isAnimated || isPaused) return;
    controls.start();
    return controls.stop;
  }, [controls, isAnimated, isPaused]);

  React.useEffect(() => {
    if (controls === undefined) return;

    board.forEach((row, y) =>
      row.forEach((shape, x) => controls.spawnBox(shape, x, y)),
    );
  }, [controls, board]);
}

function startMovement(
  view: SceneView,
  isAnimated: boolean,
): {
  readonly start: () => void;
  readonly stop: () => void;
  readonly spawnBox: (type: Shape, x: number, y: number) => Graphic;
} {
  const graphicsLayer = new GraphicsLayer();

  function rotateAll(angle: number) {
    filterArray(
      Object.values(boxes)
        .map((row) => Object.values(row ?? {}))
        .flat(),
    ).forEach((box) => rotateGraphic(box, angle));
    rotateCamera(view, angle);
  }

  const boxes: Partial<
    Record<number, Partial<Record<number, GraphicWithType>>>
  > = {};

  function spawnBox(
    type: Shape,
    offsetBlocksX: number = 0,
    offsetBlocksY: number = 0,
  ): GraphicWithType {
    boxes[offsetBlocksY] ??= {};

    boxes[offsetBlocksY]![offsetBlocksX] ??= displayBox(
      graphicsLayer,
      view,
      type,
      !isAnimated,
      // Array indexes to screen points
      -(boardX / 2) + offsetBlocksX,
      boardY / 2 - offsetBlocksY,
    );

    const box = boxes[offsetBlocksY]![offsetBlocksX]!;
    updateBox(box, type, !isAnimated);

    return box;
  }

  let interval: ReturnType<typeof setInterval> | undefined = undefined;
  const start = () => (interval = setInterval(() => rotateAll(-0.02), rate));
  const stop = () => clearInterval(interval);
  expose({ spawnBox, rotateAll, start, stop });

  return { start, stop, spawnBox };
}

const second = 1000;
const frameRate = 60;
const rate = second / frameRate;
