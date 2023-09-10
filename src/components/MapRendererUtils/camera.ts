import ArcGisCamera from '@arcgis/core/Camera';
import Point from '@arcgis/core/geometry/Point';
import type SceneView from '@arcgis/core/views/SceneView';

import { Vector } from './config';

export type Camera = {
  readonly type: 'stationary' | 'animated';
  readonly centerPoint: Point;
  readonly startPoint: Point;
  readonly initialCamera: ArcGisCamera;
  readonly rotateCamera: (view: SceneView, angle: number) => void;
  readonly sketchEdges: boolean;
  readonly initialAngle: number;
  readonly blockPosition: number;
};

/*window._canceled = false;
window._rate = async (from, to, change = 10, speed = 100, callback) => {
  for (let i = from; i <= to; i += change) {
    callback(i);
    await new Promise((resolve) => setTimeout(resolve, speed));
    if (window._canceled) return;
  }
};

window._move = (angle: number, dx = 0, dy = 0, dh = 60, distance = 2000) => {
  const centerPoint = new Point({
    spatialReference: {
      wkid: 102_100,
    },
    x: -8_238_833 + dx,
    y: 4_969_413 + dy,
    z: dh,
  });

  const { x, y } = angleToCoordinates(angle, distance);
  const cameraStart = centerPoint.clone();
  cameraStart.x += x;
  cameraStart.y += y;

  window._.view.goTo(
    new ArcGisCamera({
      position: cameraStart,
      heading: 270 - angle,
      tilt: 90,
    }),
    {
      animate: false,
    },
  );
};*/

const angleSystem = 270;

export function getCameras(type: Camera['type']): Camera {
  const isAnimated = type === 'animated';

  const centerPoint = new Point({
    spatialReference: {
      wkid: 102_100,
    },
    x: -8_238_833 + (isAnimated ? 0 : -500),
    y: 4_969_413 + (isAnimated ? 0 : -500),
    z: isAnimated ? 250 : 120,
  });

  const distanceFromCenter = isAnimated ? 2500 : 800;

  const initialAngle = isAnimated ? angleSystem : angleSystem - 30;
  const initialCamera = getCamera(initialAngle, angleSystem, 90);

  function getCamera(
    angle: number,
    previousHeading: number,
    tilt: number,
  ): ArcGisCamera {
    const { x, y } = angleToCoordinates(
      angleSystem - previousHeading + angle,
      distanceFromCenter,
    );
    const cameraStart = centerPoint.clone();
    cameraStart.x += x;
    cameraStart.y += y;

    return new ArcGisCamera({
      position: cameraStart,
      heading: previousHeading - angle,
      tilt: tilt,
    });
  }

  const rotateCamera = (view: SceneView, angle: number): void =>
    void view.goTo(getCamera(angle, view.camera.heading, view.camera.tilt), {
      animate: false,
    });

  const startPoint = getCamera(0, angleSystem, 90).position;

  return {
    type,
    centerPoint,
    initialCamera,
    rotateCamera,
    // Sketch edges look buggy when animated
    sketchEdges: !isAnimated,
    initialAngle,
    startPoint,
    blockPosition: isAnimated ? 0.7 : 0.2,
  };
}

function angleToCoordinates(angleDegrees: number, radius: number): Vector {
  const angleRadians = (angleDegrees * Math.PI) / 180;
  return {
    x: radius * Math.cos(angleRadians),
    y: radius * Math.sin(angleRadians),
  };
}
