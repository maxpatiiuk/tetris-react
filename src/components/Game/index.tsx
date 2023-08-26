import SceneView from '@arcgis/core/views/SceneView';
import Graphic from '@arcgis/core/Graphic';
import Polygon from '@arcgis/core/geometry/Polygon';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import PolygonSymbol3D from '@arcgis/core/symbols/PolygonSymbol3D';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Mesh from '@arcgis/core/geometry/Mesh';
import React from 'react';
import { expose } from '../../utils/utils';
import Color from '@arcgis/core/Color';

const size = 100;
const color = (hue, opacity = 1) =>
  Color.fromRgb(`hsla(${hue}, ${250}, ${250}, ${opacity})`);

function mesh(view: SceneView) {
  let mesh = Mesh.createBox(view.camera.position.clone(), {
    size: {
      width: size,
      height: size,
      depth: size,
    },
    material: {
      color: color(undefined, 0.9),
    },
  });

  // Create a graphic and add it to the view
  let meshGraphic = new Graphic({
    geometry: mesh,
    symbol: {
      type: 'mesh-3d',
      symbolLayers: [
        {
          type: 'fill',
          material: {
            color: color(hue, 0.6),
          },
          edges: {
            type: 'sketch', // autocasts as new SketchEdges3D()
            size: size * 0.15,
            color: color(hue, 1),
            extensionLength: 2,
          },
        },
      ],
    },
  });

  const graphicsLayer = new GraphicsLayer();
  graphicsLayer.add(meshGraphic);

  view.map.add(graphicsLayer);

  expose({ meshGraphic });
}

function display(view: SceneView, type: 'polygon' | 'mesh' = 'mesh') {
  const clonePosition = view.camera.position.clone();
  const offset = [0, 5 * size, -size];
  clonePosition.x += offset[0];
  clonePosition.y += offset[1];
  clonePosition.z += offset[2];
  const { x, y, z } = clonePosition;

  const cubeVertices = [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
    [0, 0, 0],
    [0, 1, 0],
  ].map(
    (point) =>
      [point[0] * size + x, point[1] * size + y, point[2] * size + z] as [
        number,
        number,
        number
      ]
  );

  const hue = Math.random() * 360;
  const cubePolygon =
    type === 'polygon'
      ? new Polygon({
          rings: [cubeVertices],
          spatialReference: view.spatialReference,
        })
      : Mesh.createBox(clonePosition, {
          size: {
            width: size / 2,
            height: size / 2,
            depth: size / 2,
          },
          material: {
            color: color(undefined, 0.9),
          },
        });

  const fill = {
    size: size * 0.75,
    material: {
      color: color(hue, 0.6),
    },
    edges: {
      type: 'sketch', // autocasts as new SketchEdges3D()
      size: size * 0.15,
      color: color(hue, 1),
      extensionLength: 2,
    },
  };

  // Create a Graphic for the extruded polygon
  const cubeGraphic = new Graphic({
    geometry: cubePolygon,
    symbol:
      type === 'polygon'
        ? new PolygonSymbol3D({
            symbolLayers: [{ type: 'extrude', ...fill }],
          })
        : {
            type: 'mesh-3d',
            symbolLayers: [
              {
                type: 'fill',
                ...fill,
              },
            ],
          },
  });

  const graphicsLayer = new GraphicsLayer();
  graphicsLayer.add(cubeGraphic);
  view.map.add(graphicsLayer);

  expose({ cubeGraphic });
}

export function Game({ view }: { readonly view: SceneView }): null {
  React.useEffect(() => {
    display(view);
    expose({ display });
  }, []);

  return null;
}
