import FillSymbol3DLayer from '@arcgis/core/symbols/FillSymbol3DLayer';
import MeshSymbol3D from '@arcgis/core/symbols/MeshSymbol3D';
import SketchEdges3D from '@arcgis/core/symbols/edges/SketchEdges3D';
import type SceneLayer from '@arcgis/core/layers/SceneLayer';
import SceneView from '@arcgis/core/views/SceneView';
import SunLighting from '@arcgis/core/webscene/SunLighting';
import SunnyWeather from '@arcgis/core/views/3d/environment/SunnyWeather';
import CloudyWeather from '@arcgis/core/views/3d/environment/CloudyWeather';
import RainyWeather from '@arcgis/core/views/3d/environment/RainyWeather';
import SnowyWeather from '@arcgis/core/views/3d/environment/SnowyWeather';
import FoggyWeather from '@arcgis/core/views/3d/environment/FoggyWeather';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import React from 'react';
import { blockSize } from '../MapRendererUtils/config';
import { buildColor } from '../MapRendererUtils/box';
import { expose, fairRandomItem } from '../../lib/utils';
import { RA } from '../../lib/types';

/* Add special effects to the map in response to score change  */
export function useEffects(view: SceneView | undefined, score: number): void {
  React.useEffect(() => {
    if (view === undefined) return;
    updateEnvironment(view);
    expose({ updateEnvironment });
  }, [view, score]);
}

function updateEnvironment(view: SceneView) {
  updateRenderer(view);
  updateTime(view);
  updateWeather(view);
}

function updateRenderer(view: SceneView): void {
  const layer = view.map.allLayers.find(({ title }) => title === 'Buildings');
  if (layer !== undefined) (layer as SceneLayer).renderer = getRenderer();
}

const getRenderer = (hue = Math.floor(Math.random() * 365)): SimpleRenderer =>
  new SimpleRenderer({
    symbol: new MeshSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: {
            color: buildColor(hue, 100, 90),
            colorMixMode: 'replace',
          },
          edges: new SketchEdges3D({
            size: blockSize * 0.15,
            color: buildColor(hue, 100, 90, 0.3),
          }),
        }),
      ],
    }),
  });

const timeRandomizer = fairRandomItem(
  Array.from({ length: 24 }, (_, index) => index),
);

function updateTime(view: SceneView): void {
  const date = new Date();
  date.setHours(timeRandomizer());
  (view.environment.lighting as SunLighting).date = date;
}

function updateWeather(view: SceneView): void {
  view.environment.weather = weatherRandomizer()();
}

const weatherGenerators: RA<
  () =>
    | SunnyWeather
    | CloudyWeather
    | RainyWeather
    | SnowyWeather
    | FoggyWeather
> = [
  () =>
    new SunnyWeather({
      cloudCover: Math.random(),
    }),
  () =>
    new CloudyWeather({
      cloudCover: Math.random(),
    }),
  () =>
    new RainyWeather({
      cloudCover: Math.random(),
      precipitation: Math.random(),
    }),
  () =>
    new SnowyWeather({
      cloudCover: Math.random(),
      precipitation: Math.random(),
    }),
  () =>
    new FoggyWeather({
      // Fog 1 is too much - can't see the board at all
      fogStrength: Math.min(Math.random(), 0.9),
    }),
];

const weatherRandomizer = fairRandomItem(weatherGenerators);
