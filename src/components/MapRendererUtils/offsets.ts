import Point from '@arcgis/core/geometry/Point';

import { cameraMesh, centerPoint } from './camera';
import { blockSize } from './config';

/**
 * Compute x, y and z to offset a block by a given number of blocks on a plane
 * between two points (center point and camera)
 */
export function computeOffsets(
  offsetBlocksX: number,
  offsetBlocksY: number,
): Point {
  const direction = normalize(computeDirection());
  const offsetMagnitudeY = perpendicularOne(direction);
  const offsetMagnitudeX = perpendicularTwo(direction, offsetMagnitudeY);

  const xSize = blockSize * 13;
  const ySize = blockSize * 10;
  return new Point({
    x:
      offsetMagnitudeX.x * offsetBlocksX * xSize +
      offsetMagnitudeY.x * offsetBlocksY * ySize,
    y:
      offsetMagnitudeX.y * offsetBlocksX * xSize +
      offsetMagnitudeY.y * offsetBlocksY * ySize,
    z:
      offsetMagnitudeX.z * offsetBlocksX * xSize +
      offsetMagnitudeY.z * offsetBlocksY * ySize,
  });
}

const computeDirection = (): Point =>
  new Point({
    x: centerPoint.x - cameraMesh.extent.center.x,
    y: centerPoint.y - cameraMesh.extent.center.y,
    z: centerPoint.z - cameraMesh.extent.center.z,
  });

function normalize(point: Point): Point {
  const magnitude = computeMagnitude(point);
  return new Point({
    x: point.x / magnitude,
    y: point.y / magnitude,
    z: point.z / magnitude,
  });
}

const perpendicularOne = (point: Point): Point =>
  new Point({
    x: 0,
    y: -point.z,
    z: point.x,
  });

const perpendicularTwo = (point: Point, perpendicularOne: Point): Point =>
  new Point({
    x: point.y * perpendicularOne.z - point.z * perpendicularOne.y,
    y: point.z * perpendicularOne.x - point.x * perpendicularOne.z,
    z: point.x * perpendicularOne.y - point.y * perpendicularOne.x,
  });

const computeMagnitude = (point: Point): number =>
  Math.sqrt(point.x ** 2 + point.y ** 2 + point.z ** 2);
