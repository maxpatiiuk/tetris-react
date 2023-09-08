import type Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import type SceneView from '@arcgis/core/views/SceneView';

import { expose } from '../../lib/utils';
import type { WritableArray } from '../../lib/types';
import { displayBox, rotateGraphic } from './box';
import { rotateCamera } from './camera';
import React from 'react';

export function useMovement(
  view: SceneView | undefined,
  isAnimated: boolean,
  isPaused: boolean,
): void {
  const controls = React.useMemo(
    () => (view === undefined ? undefined : startMovement(view, isAnimated)),
    [view, isAnimated],
  );

  React.useEffect(() => {
    if (controls === undefined || isPaused) return;
    controls.start();
    return controls.stop;
  }, [controls, isPaused]);
}

function startMovement(
  view: SceneView,
  isAnimated: boolean,
): {
  readonly start: () => void;
  readonly stop: () => void;
} {
  const graphicsLayer = new GraphicsLayer();

  function rotateAll(angle: number) {
    boxes.forEach((box) => rotateGraphic(box, angle));
    rotateCamera(view, angle);
  }

  const boxes: WritableArray<Graphic> = [];
  function spawnBox(offsetBlocksX: number = 0, offsetBlocksY: number = 0) {
    const box = displayBox(
      graphicsLayer,
      view,
      isAnimated,
      offsetBlocksX,
      offsetBlocksY,
    );
    boxes.push(box);
  }

  let interval: ReturnType<typeof setInterval> | undefined = undefined;
  const start = () => (interval = setInterval(() => rotateAll(-0.01), rate));
  const stop = () => clearInterval(interval);
  expose({ spawnBox, rotateAll, start, stop });

  return { start, stop };
}

const second = 1000;
const frameRate = 60;
const rate = second / frameRate;
