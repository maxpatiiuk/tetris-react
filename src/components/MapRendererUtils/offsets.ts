import Point from '@arcgis/core/geometry/Point';

import { blockSize } from './config';
import { Vector } from './config';
import { Camera } from './camera';

/**
 * Compute x, y and z to offset a block by a given number of blocks on a plane
 * between two points (center point and camera)
 */
export function computeOffsets(
  camera: Camera,
  { x: offsetBlocksX, y: offsetBlocksY }: Vector,
): Point {
  const direction = normalize(computeDirection(camera));
  const offsetMagnitudeY = perpendicularOne(direction);
  const offsetMagnitudeX = perpendicularTwo(direction, offsetMagnitudeY);

  const xSize = blockSize * 0.75;
  const ySize = blockSize * 0.55;
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

const computeDirection = ({ centerPoint, startPoint }: Camera): Point =>
  new Point({
    x: centerPoint.x - startPoint.x,
    y: centerPoint.y - startPoint.y,
    z: centerPoint.z - startPoint.z,
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
