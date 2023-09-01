import Point from '@arcgis/core/geometry/Point';
import { cameraMesh, centerPoint } from './camera';
import { blockSize } from './config';

/**
 * Compute x, y and z to offset a block by a given number of blocks on a plane
 * between two points (center point and camera)
 */
export function computeOffsets(
  offsetBlocksX: number,
  offsetBlocksY: number
): Point {
  const direction = normalize(computeDirection());
  const offsetMagnitudeX = perpendicularOne(direction);
  const offsetMagnitudeZ = perpendicularTwo(direction, offsetMagnitudeX);

  return new Point({
    x:
      offsetMagnitudeX.x * offsetBlocksX * blockSize +
      offsetMagnitudeZ.x * offsetBlocksY * blockSize,
    y:
      offsetMagnitudeX.y * offsetBlocksX * blockSize +
      offsetMagnitudeZ.y * offsetBlocksY * blockSize,
    z:
      offsetMagnitudeX.z * offsetBlocksX * blockSize +
      offsetMagnitudeZ.z * offsetBlocksY * blockSize,
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
