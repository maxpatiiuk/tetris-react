import SceneView from '@arcgis/core/views/SceneView';
import Graphic from '@arcgis/core/Graphic';
import SketchEdges3D from '@arcgis/core/symbols/edges/SketchEdges3D';
import MeshSymbol3d from '@arcgis/core/symbols/MeshSymbol3d';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Camera from '@arcgis/core/Camera';
import FillSymbol3DLayer from '@arcgis/core/symbols/FillSymbol3DLayer';
import type Point from '@arcgis/core/geometry/Point';
import React from 'react';
import { expose } from '../../utils/utils';
import Color from '@arcgis/core/Color';
import { cameraMesh, centerPoint } from '../Game/camera';
import Mesh from '@arcgis/core/geometry/Mesh';

const second = 1000;
const frameRate = 60;
const rate = second / frameRate;

export function Game({ view }: { readonly view: SceneView }): null {
  React.useEffect(() => {
    startMovement(view);
  }, [view]);

  return null;
}

export function startMovement(view: SceneView) {
  const graphicsLayer = new GraphicsLayer();

  let boxes: Graphic[] = [];
  function displayBox() {
    const box = display(graphicsLayer, view);
    boxes.push(box);
  }

  function rotateAll(angle: number) {
    boxes.forEach((box) => rotateGraphic(box, angle));
    rotateCamera(view, angle);
  }

  let interval: ReturnType<typeof setInterval> | undefined = undefined;
  const start = () => (interval = setInterval(() => rotateAll(-0.01), rate));
  const stop = () => clearInterval(interval);
  expose({ displayBox, rotateAll, start, stop });
}

function rotateCamera(view: SceneView, angle: number): void {
  const newPosition = cameraMesh.rotate(0, 0, angle, { origin: centerPoint })
    .extent.center;

  const newCamera = new Camera({
    position: newPosition,
    heading: view.camera.heading - angle,
    tilt: view.camera.tilt,
  });

  view.goTo({ target: newCamera }, { animate: false });
}

function rotateGraphic(graphic: Graphic, angle: number): void {
  const mesh = graphic.geometry as Mesh;
  graphic.geometry = mesh.rotate(0, 0, angle, { origin: centerPoint }).clone();
}

const size = 100;
const saturation = 250;
const luminosity = 250;
const color = (hue: number, opacity = 1) =>
  Color.fromRgb(
    `hsla(${Math.floor(hue)}, ${saturation}, ${luminosity}, ${opacity})`
  );

function display(graphicsLayer: GraphicsLayer, view: SceneView) {
  const clonePosition = view.camera.position.clone();
  const offset = [0, 5 * size, -size];
  clonePosition.x += offset[0];
  clonePosition.y += offset[1];
  clonePosition.z += offset[2];
  const box = createBox(clonePosition);
  graphicsLayer.add(box);
  // FIXME: if this is called before first 5 seconds, it doesn't work. Why?
  view.map.add(graphicsLayer);
  return box;
}

function createBox(position: Point): Graphic {
  const hue = Math.random() * 360;
  const cubePolygon = Mesh.createBox(position, {
    size: {
      width: size / 2,
      height: size / 2,
      depth: size / 2,
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
          edges: new SketchEdges3D({
            size: size * 0.15,
            color: color(hue, 1),
            extensionLength: 2,
          }),
        }),
      ],
    }),
  });
}
