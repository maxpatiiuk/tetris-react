import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import { blockSize } from './config';
import Mesh from '@arcgis/core/geometry/Mesh';
import { cameraMesh, centerPoint, rotateMesh } from './camera';
import { computeOffsets } from './offsets';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SceneView from '@arcgis/core/views/SceneView';
import MeshSymbol3d from '@arcgis/core/symbols/MeshSymbol3d';
import FillSymbol3DLayer from '@arcgis/core/symbols/FillSymbol3DLayer';
import SketchEdges3D from '@arcgis/core/symbols/edges/SketchEdges3D';
import SolidEdges3D from '@arcgis/core/symbols/edges/SolidEdges3D';
import Color from '@arcgis/core/Color';

export function rotateGraphic(graphic: Graphic, angle: number): void {
  const mesh = graphic.geometry as Mesh;
  graphic.geometry = rotateMesh(mesh, angle).clone();
}

export function displayBox(
  graphicsLayer: GraphicsLayer,
  view: SceneView,
  offsetBlocksX: number = 0,
  offsetBlocksY: number = 0
) {
  const offsets = computeOffsets(offsetBlocksX, offsetBlocksY);

  const newPosition = cameraMesh.extent.center.clone();
  newPosition.x = mixPoints(centerPoint.x, newPosition.x) + offsets.x;
  newPosition.y = mixPoints(centerPoint.y, newPosition.y) + offsets.y;
  newPosition.z = mixPoints(centerPoint.z, newPosition.z) + offsets.z;

  const box = createBox(newPosition);
  graphicsLayer.add(box);
  // FIXME: if this is called before first 5 seconds, it doesn't work. Why?
  view.map.add(graphicsLayer);
  return box;
}

const mix = (ratio: number, left: number, right: number): number =>
  left * (1 - ratio) + right * ratio;

const distanceFromCenter = 0.6;
const mixPoints = mix.bind(undefined, distanceFromCenter);

// FIXME: re-enabled sketch edges for stationary map
function createBox(position: Point, sketchEdges: boolean = false): Graphic {
  const hue = Math.random() * 360;
  const cubePolygon = Mesh.createBox(position, {
    size: {
      width: blockSize / 2,
      height: blockSize / 2,
      depth: blockSize / 2,
    },
  });

  return new Graphic({
    geometry: cubePolygon,
    symbol: new MeshSymbol3d({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: {
            color: color(hue, 0.5),
          },
          edges: sketchEdges
            ? new SketchEdges3D({
                size: blockSize * 0.15,
                color: color(hue, 1),
              })
            : new SolidEdges3D({
                size: blockSize * 0.15,
                color: color(hue, 1),
              }),
        }),
      ],
    }),
  });
}

const saturation = 250;
const luminosity = 250;
const color = (hue: number, opacity = 1) =>
  Color.fromRgb(
    `hsla(${Math.floor(hue)}, ${saturation}, ${luminosity}, ${opacity})`
  );
