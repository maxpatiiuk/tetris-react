import './styles.css';

import Basemap from '@arcgis/core/Basemap';
import Map from '@arcgis/core/Map';
import CloudyWeather from '@arcgis/core/views/3d/environment/CloudyWeather';
import SceneView from '@arcgis/core/views/SceneView';
import React from 'react';

import { expose } from '../../lib/utils';
import { useMovement as useBoard } from '../MapRendererUtils';
import { cameraMesh, stationaryCamera } from '../MapRendererUtils/camera';
import type { RendererProps } from '../Renderers/types';

const mapRenderer = (isAnimated: boolean) =>
  function MapRenderer({ isPaused, board, ...state }: RendererProps) {
    const [mapContainer, setMap] = React.useState<HTMLDivElement | null>(null);
    const [view, setView] = React.useState<SceneView | undefined>(undefined);

    React.useEffect(() => {
      if (mapContainer === null) return;

      const map = new Map({
        basemap: new Basemap({
          portalItem: {
            id: '0560e29930dc4d5ebeb58c635c0909c9', // References the 3D Topographic Basemap
          },
        }),
      });

      const view = new SceneView({
        container: mapContainer,
        map,
        // TODO: customizable: https://next.sites.afd.arcgis.com/javascript/latest/sample-code/sandbox/?sample=scene-weather
        environment: {
          weather: new CloudyWeather({
            cloudCover: 0.3,
          }),
          lighting: {
            // Enable shadows for all the objects in a scene
            directShadowsEnabled: true,
            // Set the date and a time of the day for the current camera location
            date: new Date('Sun Mar 15 2019 16:00:00 GMT+0100 (CET)'),
          },
        },
        // TODO: make this go around in circle
        camera: isAnimated
          ? {
              position: cameraMesh.extent.center,
              heading: 0,
              tilt: 90,
            }
          : stationaryCamera,
        qualityProfile: 'high',
      });

      view.when(() => {
        // Disable labels
        view.map.allLayers.at(2).visible = false;

        setView(view);
      });
      expose({ map, view });
    }, [mapContainer]);

    useBoard(view, board, isAnimated, isPaused);

    return <div className="w-full h-full" ref={setMap} />;
  };

export const PanoramaRenderer = mapRenderer(true);
export const SceneryRenderer = mapRenderer(false);
