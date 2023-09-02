import SceneView from '@arcgis/core/views/SceneView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { expose } from '../../lib/utils';
import { rotateCamera } from './camera';
import { displayBox, rotateGraphic } from './box';

const second = 1000;
const frameRate = 60;
const rate = second / frameRate;

export function startMovement(view: SceneView, animated: boolean) {
  const graphicsLayer = new GraphicsLayer();

  function rotateAll(angle: number) {
    boxes.forEach((box) => rotateGraphic(box, angle));
    rotateCamera(view, angle);
  }

  let boxes: Graphic[] = [];
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
