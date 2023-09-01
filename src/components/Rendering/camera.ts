import Point from '@arcgis/core/geometry/Point';
import Mesh from '@arcgis/core/geometry/Mesh';
import { expose } from '../../utils/utils';
import Camera from '@arcgis/core/Camera';
import SceneView from '@arcgis/core/views/SceneView';

export const centerPoint = new Point({
  spatialReference: {
    wkid: 102100,
  },
  x: -8239043,
  y: 4969106,
  z: 250,
});

const cameraStart = centerPoint.clone();
cameraStart.x -= 100;
cameraStart.y -= 1800;

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
