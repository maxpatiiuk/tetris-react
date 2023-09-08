import type Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import type SceneView from '@arcgis/core/views/SceneView';

import { expose } from '../../lib/utils';
import { displayBox, rotateGraphic } from './box';
import { rotateCamera } from './camera';

const second = 1000;
const frameRate = 60;
const rate = second / frameRate;

export function startMovement(view: SceneView, animated: boolean) {
  const graphicsLayer = new GraphicsLayer();

  function rotateAll(angle: number) {
    boxes.forEach((box) => rotateGraphic(box, angle));
    rotateCamera(view, angle);
  }

  const boxes: readonly Graphic[] = [];
  function spawnBox(offsetBlocksX: number = 0, offsetBlocksY: number = 0) {
    const box = displayBox(
      graphicsLayer,
      view,
      animated,
      offsetBlocksX,
      offsetBlocksY,
    );
    boxes.push(box);
  }

  let interval: ReturnType<typeof setInterval> | undefined = undefined;
  const start = () => (interval = setInterval(() => rotateAll(-0.01), rate));
  const stop = () => clearInterval(interval);
  expose({ spawnBox, rotateAll, start, stop });

  if (animated) start();
}
