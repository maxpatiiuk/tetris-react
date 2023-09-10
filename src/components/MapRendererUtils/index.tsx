import type Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

import { expose, filterArray } from '../../lib/utils';
import type { RA } from '../../lib/types';
import { GraphicWithType, displayBox, rotateGraphic, updateBox } from './box';
import React from 'react';
import { Shape, boardX, boardY } from '../../config';
import { Camera } from './camera';
import SceneView from '@arcgis/core/views/SceneView';

export function useMovement(
  view: SceneView | undefined,
  board: RA<RA<Shape>>,
  camera: Camera,
  isPaused: boolean,
): void {
  const controls = React.useMemo(
    () => (view === undefined ? undefined : startMovement(view, camera)),
    [view, camera.type],
  );

  const isAnimated = camera.type === 'animated';
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
  camera: Camera,
): {
  readonly start: () => void;
  readonly stop: () => void;
  readonly spawnBox: (type: Shape, x: number, y: number) => Graphic;
} {
  const graphicsLayer = new GraphicsLayer();

  function rotateAll(angle: number, graphicAngle = angle) {
    filterArray(
      Object.values(boxes)
        .map((row) => Object.values(row ?? {}))
        .flat(),
    ).forEach((box) => rotateGraphic(box, graphicAngle, camera));
    camera.rotateCamera(view, angle);
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
      type,
      camera,
      {
        // Array indexes to screen points
        x: -(boardX / 2) + offsetBlocksX,
        y: boardY / 2 - offsetBlocksY,
      },
    );

    const box = boxes[offsetBlocksY]![offsetBlocksX]!;
    updateBox(box, type, camera);

    return box;
  }
  view.map.add(graphicsLayer);

  let interval: ReturnType<typeof setInterval> | undefined = undefined;
  const start = () => (interval = setInterval(() => rotateAll(-0.04), rate));
  const stop = () => clearInterval(interval);
  expose({ graphicsLayer, spawnBox, rotateAll, start, stop });

  return { start, stop, spawnBox };
}

const second = 1000;
const frameRate = 60;
const rate = second / frameRate;
