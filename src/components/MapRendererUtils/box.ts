import Color from '@arcgis/core/Color';
import Mesh from '@arcgis/core/geometry/Mesh';
import type Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import type GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SketchEdges3D from '@arcgis/core/symbols/edges/SketchEdges3D';
import SolidEdges3D from '@arcgis/core/symbols/edges/SolidEdges3D';
import FillSymbol3DLayer from '@arcgis/core/symbols/FillSymbol3DLayer';
import MeshSymbol3d from '@arcgis/core/symbols/MeshSymbol3d';
import type SceneView from '@arcgis/core/views/SceneView';

import { cameraMesh, centerPoint, rotateMesh } from './camera';
import { blockSize } from './config';
import { computeOffsets } from './offsets';
import { Shape, shapes } from '../../config';

export function rotateGraphic(graphic: Graphic, angle: number): void {
  const mesh = graphic.geometry as Mesh;
  graphic.geometry = rotateMesh(mesh, angle).clone();
}

export type GraphicWithType = Graphic & {
  readonly symbol: Symbol & { readonly shape: Shape };
};

export function displayBox(
  graphicsLayer: GraphicsLayer,
  view: SceneView,
  shape: Shape,
  sketchEdges: boolean,
  offsetBlocksX: number = 0,
  offsetBlocksY: number = 0,
): GraphicWithType {
  const offsets = computeOffsets(offsetBlocksX, offsetBlocksY);

  const newPosition = cameraMesh.extent.center.clone();
  newPosition.x = mixPoints(centerPoint.x, newPosition.x) + offsets.x;
  newPosition.y = mixPoints(centerPoint.y, newPosition.y) + offsets.y;
  newPosition.z = mixPoints(centerPoint.z, newPosition.z) + offsets.z;

  const box = createBox(newPosition, shape, sketchEdges);
  graphicsLayer.add(box);
  // FIXME: if this is called before first 5 seconds, it doesn't work. Why?
  view.map.add(graphicsLayer);

  return box;
}

const mix = (ratio: number, left: number, right: number): number =>
  left * (1 - ratio) + right * ratio;

const distanceFromCenter = 0.5;
const mixPoints = mix.bind(undefined, distanceFromCenter);

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
  const symbol = new MeshSymbol3d({
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
                size: blockSize * 0.15,
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
  return Color.fromRgb(
    [
      'hsla(',
      Math.floor(hue),
      ', ',
      saturation,
      '%, ',
      type === '_' ? 100 : luminosity,
      '%, ',
      type === '_' ? opacity * 0.6 : opacity,
      ')',
    ].join(''),
  );
}

export function updateBox(
  box: GraphicWithType,
  shape: Shape,
  sketchEdges: boolean,
): void {
  if (box.symbol.shape === shape) return;
  box.symbol = getSymbol(shape, sketchEdges);
}
