import React, { useRef, useEffect } from 'react';
import SceneView from '@arcgis/core/views/SceneView';
import Basemap from '@arcgis/core/Basemap';
import Map from '@arcgis/core/Map';
import CloudyWeather from '@arcgis/core/views/3d/environment/CloudyWeather';
import { expose } from '../../utils/utils';

import './App.css';

export function App() {
  const mapDiv = useRef(null);
  const [view, setView] = React.useState<SceneView | undefined>(undefined);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      // TODO: try out cartoonish map too. https://developers.arcgis.com/rest/basemap-styles/#arcgis-styles
      const map = new Map({
        basemap: new Basemap({
          portalItem: {
            id: '0560e29930dc4d5ebeb58c635c0909c9', // References the 3D Topographic Basemap
          },
        }),
      });
      /*
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import PortalItem from '@arcgis/core/portal/PortalItem';
      const layer = new SceneLayer({
        portalItem: new PortalItem({
          id: '2e0761b9a4274b8db52c4bf34356911e',
        }),
      });
      const map = new Map({
        basemap: 'satellite',
        layers: [layer],
      });*/

      const view = new SceneView({
        container: mapDiv.current,
        map,
        // TODO: customizable
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
        /*camera: {
          position: {
            spatialReference: {
              wkid: 102100,
            },
            x: -8238801.332498223,
            y: 4966545.783432331,
            z: 922.5304415896535,
          },
          heading: 355.34945708849745,
          tilt: 63.929760641832004,
        },*/

        camera: {
          position: {
            longitude: -74.03423765,
            latitude: 40.69173202,
            z: 1620.71497,
          },
          heading: 57.02,
          tilt: 56.97,
        },
      });

      view.when(() => {
        setView(view);
        // Disable labels
        view.map.allLayers.at(2).visible = false;
      });
      expose({ map, view });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}
