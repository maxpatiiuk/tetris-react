import SceneView from '@arcgis/core/views/SceneView';
import Graphic from '@arcgis/core/Graphic';
import SketchEdges3D from '@arcgis/core/symbols/edges/SketchEdges3D';
import MeshSymbol3d from '@arcgis/core/symbols/MeshSymbol3d';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import MeshMaterial from '@arcgis/core/geometry/support/MeshMaterial';
import Mesh from '@arcgis/core/geometry/Mesh';
import React from 'react';
import { expose } from '../../utils/utils';
import Color from '@arcgis/core/Color';
import { type } from 'os';

const size = 100;
const color = (hue, opacity = 1) =>
  Color.fromRgb(`hsla(${hue}, ${250}, ${250}, ${opacity})`);

function display(view: SceneView) {
  const clonePosition = view.camera.position.clone();
  const offset = [0, 5 * size, -size];
  clonePosition.x += offset[0];
  clonePosition.y += offset[1];
  clonePosition.z += offset[2];

  const hue = Math.random() * 360;
  const cubePolygon = Mesh.createBox(clonePosition, {
    size: {
      width: size / 2,
      height: size / 2,
      depth: size / 2,
    },
    material: new MeshMaterial({
      color: color(undefined, 0.9),
    }),
  });

  const fill = {
    size: size * 0.75,
    material: {
      color: color(hue, 0.6),
    },
    edges: new SketchEdges3D({
      size: size * 0.15,
      color: color(hue, 1),
      extensionLength: 2,
    }),
  };

  // Create a Graphic for the extruded polygon
  const cubeGraphic = new Graphic({
    geometry: cubePolygon,
    symbol: new MeshSymbol3d({
      symbolLayers: [
        {
          type: 'fill',
          ...fill,
        },
      ],
    }),
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
