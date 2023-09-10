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
