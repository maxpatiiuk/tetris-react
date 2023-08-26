import SceneView from '@arcgis/core/views/SceneView';
import Graphic from '@arcgis/core/Graphic';
import SketchEdges3D from '@arcgis/core/symbols/edges/SketchEdges3D';
import MeshSymbol3d from '@arcgis/core/symbols/MeshSymbol3d';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import FillSymbol3DLayer from '@arcgis/core/symbols/FillSymbol3DLayer';
import MeshMaterial from '@arcgis/core/geometry/support/MeshMaterial';
import type Point from '@arcgis/core/geometry/Point';
import Mesh from '@arcgis/core/geometry/Mesh';
import React from 'react';
import { expose } from '../../utils/utils';
import Color from '@arcgis/core/Color';

export function Game({ view }: { readonly view: SceneView }): null {
  React.useEffect(() => {
    display(view);
    expose({ display });
  }, []);

  return null;
}

const size = 100;
const saturation = 250;
const luminosity = 250;
const color = (hue, opacity = 1) =>
  Color.fromRgb(
    `hsla(${Math.floor(hue)}, ${saturation}, ${luminosity}, ${opacity})`
  );

function display(view: SceneView) {
  const clonePosition = view.camera.position.clone();
  const offset = [0, 5 * size, -size];
  clonePosition.x += offset[0];
  clonePosition.y += offset[1];
  clonePosition.z += offset[2];
  const box = createBox(clonePosition);
  const graphicsLayer = new GraphicsLayer();
  graphicsLayer.add(box);
  view.map.add(graphicsLayer);
}

function createBox(position: Point): Graphic {
  const hue = Math.random() * 360;
  const cubePolygon = Mesh.createBox(position, {
    size: {
      width: size / 2,
      height: size / 2,
      depth: size / 2,
    },
    material: new MeshMaterial({
      color: color(hue, 0.9),
    }),
  });

  // Create a Graphic for the extruded polygon
  return new Graphic({
    geometry: cubePolygon,
    symbol: new MeshSymbol3d({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: {
            color: color(hue, 0.6),
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
