import Color from '@arcgis/core/Color';
import Mesh from '@arcgis/core/geometry/Mesh';
import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import type GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SketchEdges3D from '@arcgis/core/symbols/edges/SketchEdges3D';
import SolidEdges3D from '@arcgis/core/symbols/edges/SolidEdges3D';
import FillSymbol3DLayer from '@arcgis/core/symbols/FillSymbol3DLayer';
import MeshSymbol3D from '@arcgis/core/symbols/MeshSymbol3D';

import { Camera } from './camera';
import { blockSize } from './config';
import { computeOffsets } from './offsets';
import { Shape, shapes } from '../../config';
import { Vector } from './config';

export function rotateGraphic(
  graphic: Graphic,
  angle: number,
  camera: Camera,
): void {
  const mesh = graphic.geometry as Mesh;
  graphic.geometry = mesh
    .rotate(0, 0, angle, { origin: camera.centerPoint })
    .clone();
}

export type GraphicWithType = Graphic & {
  readonly symbol: Symbol & { readonly shape: Shape };
};

export function displayBox(
  graphicsLayer: GraphicsLayer,
  shape: Shape,
  camera: Camera,
  offset: Vector = { x: 0, y: 0 },
): GraphicWithType {
  const offsets = computeOffsets(camera, offset);

  const { centerPoint } = camera;

  const newPosition = camera.startPoint.clone();
  const mixPoints = mix.bind(undefined, camera.blockPosition);
  newPosition.x = mixPoints(centerPoint.x, camera.startPoint.x) - offsets.x;
  newPosition.y = mixPoints(centerPoint.y, camera.startPoint.y) - offsets.y;
  newPosition.z = mixPoints(centerPoint.z, camera.startPoint.z) - offsets.z;

  const box = createBox(newPosition, shape, camera.sketchEdges);
  rotateGraphic(box, camera.initialAngle, camera);
  graphicsLayer.add(box);

  return box;
}

const mix = (ratio: number, left: number, right: number): number =>
  left * (1 - ratio) + right * ratio;

function createBox(
  position: Point,
  shape: Shape,
  sketchEdges: boolean = false,
): GraphicWithType {
  const cubePolygon = Mesh.createBox(position, {
    size: {
      width: blockSize / 2,
      height: blockSize / 2,
      depth: blockSize / 2,
    },
  });

  return new Graphic({
    geometry: cubePolygon,
    symbol: getSymbol(shape, sketchEdges),
  }) as GraphicWithType;
}

function getSymbol(
  shape: Shape,
  sketchEdges: boolean,
): GraphicWithType['symbol'] {
  const symbol = new MeshSymbol3D({
    symbolLayers: [
      new FillSymbol3DLayer({
        material: {
          color: color(shape, 0.5),
        },
        edges:
          shape === '_'
            ? undefined
            : sketchEdges
            ? new SketchEdges3D({
                size: blockSize * 0.5,
                color: color(shape, 0.9),
              })
            : new SolidEdges3D({
                size: blockSize * 0.15,
                color: color(shape, 0.9),
              }),
      }),
    ],
  });
  Object.defineProperty(symbol, 'shape', { value: shape });
  return symbol as unknown as GraphicWithType['symbol'];
}

const saturation = 100;
const luminosity = 40;
function color(type: Shape, opacity = 1) {
  const hue = shapes[type].color[0];
  return buildColor(
    hue,
    saturation,
    type === '_' ? 100 : luminosity,
    type === '_' ? opacity * 0.6 : opacity,
  );
}

export const buildColor = (
  hue: number,
  saturation: number,
  luminosity: number,
  opacity = 1,
) =>
  Color.fromRgb(
    [
      'hsla(',
      hue,
      ', ',
      saturation,
      '%, ',
      luminosity,
      '%, ',
      opacity,
      ')',
    ].join(''),
  );

export function updateBox(
  box: GraphicWithType,
  shape: Shape,
  camera: Camera,
): void {
  if (box.symbol.shape === shape) return;
  box.symbol = getSymbol(shape, camera.sketchEdges);
}
