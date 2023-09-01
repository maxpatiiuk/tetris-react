import React, { useRef, useEffect } from 'react';
import SceneView from '@arcgis/core/views/SceneView';
import Basemap from '@arcgis/core/Basemap';
import Map from '@arcgis/core/Map';
import CloudyWeather from '@arcgis/core/views/3d/environment/CloudyWeather';
import { expose } from '../../lib/utils';
import { cameraMesh } from '../MapRendererUtils/camera';

import './App.css';
import './index.css';
import { startMovement } from '../MapRendererUtils';

export function App() {
  const mapDiv = useRef(null);
  const [view, setView] = React.useState<SceneView | undefined>(undefined);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const map = new Map({
        basemap: new Basemap({
          portalItem: {
            id: '0560e29930dc4d5ebeb58c635c0909c9', // References the 3D Topographic Basemap
          },
        }),
      });

      const view = new SceneView({
        container: mapDiv.current,
        map,
        // TODO: customizable: https://next.sites.afd.arcgis.com/javascript/latest/sample-code/sandbox/?sample=scene-weather
        environment: {
          weather: new CloudyWeather({
            cloudCover: 0.3,
          }),
          lighting: {
            // enable shadows for all the objects in a scene
            directShadowsEnabled: true,
            // set the date and a time of the day for the current camera location
            date: new Date('Sun Mar 15 2019 16:00:00 GMT+0100 (CET)'),
          },
        },
        // TODO: make this go around in circle
        camera: {
          position: cameraMesh.extent.center,
          heading: 0,
          tilt: 90,
        },
        qualityProfile: 'high',
      });

      view.when(() => {
        setView(view);
        // Disable labels
        view.map.allLayers.at(2).visible = false;

        startMovement(view);
      });
      expose({ map, view });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv} />;
}
