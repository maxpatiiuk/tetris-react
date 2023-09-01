import Point from '@arcgis/core/geometry/Point';
import Mesh from '@arcgis/core/geometry/Mesh';
import { expose } from '../../utils/utils';

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
 * - It has a nice method for rotating the position (though that is available
 *   though other ways to)
 * - Most importantly, because rotating the camera and rotating the polygons
 *   can be accomplished in a consistent way
 */
export const cameraMesh = Mesh.createBox(cameraStart, {
  size: {
    width: 1,
    height: 1,
    depth: 1,
  },
});

expose({ centerPoint, cameraMesh });
