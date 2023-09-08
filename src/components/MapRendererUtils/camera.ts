import Camera from '@arcgis/core/Camera';
import Mesh from '@arcgis/core/geometry/Mesh';
import Point from '@arcgis/core/geometry/Point';
import type SceneView from '@arcgis/core/views/SceneView';

import { expose } from '../../lib/utils';

export const centerPoint = new Point({
  spatialReference: {
    wkid: 102_100,
  },
  x: -8_239_043,
  y: 4_969_106,
  z: 250,
});

const cameraStart = centerPoint.clone();
cameraStart.x -= 100;
cameraStart.y -= 1800;

export const stationaryCamera = new Camera({
  position: {
    spatialReference: {
      wkid: 102100,
    },
    x: -8239642.780754315,
    y: 4968177.0089062005,
    z: 37.09296718426049,
  },
  heading: 24.257897820847298,
  tilt: 95.19672570018218,
});

/**
 * Using mesh for camera position because:
 * - It has a nice method for rotating the position relative to some other point
 *   (center)
 * - Because this way rotating the camera and rotating the polygons can be
 *   accomplished in a consistent way
 */
export const cameraMesh = Mesh.createBox(cameraStart, {
  size: {
    width: 1,
    height: 1,
    depth: 1,
  },
});

export function rotateCamera(view: SceneView, angle: number): void {
  const newPosition = rotateMesh(cameraMesh, angle).extent.center;

  const newCamera = new Camera({
    position: newPosition,
    heading: view.camera.heading - angle,
    tilt: view.camera.tilt,
  });

  view.goTo({ target: newCamera }, { animate: false });
}

export const rotateMesh = (mesh: Mesh, angle: number): Mesh =>
  mesh.rotate(0, 0, angle, { origin: centerPoint });

expose({ centerPoint, cameraMesh });
