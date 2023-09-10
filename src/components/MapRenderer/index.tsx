import './styles.css';

import Basemap from '@arcgis/core/Basemap';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import React from 'react';

import { expose } from '../../lib/utils';
import { useMovement as useBoard } from '../MapRendererUtils';
import { Camera, getCameras } from '../MapRendererUtils/camera';
import type { RendererProps } from '../Renderers/types';
import { useEffects } from './useEffects';
import { GameAside } from '../Renderers/GameAside';

const mapRenderer = (cameraType: Camera['type']) =>
  function MapRenderer({ isPaused, board, nextShape, score }: RendererProps) {
    const camera = React.useMemo(() => getCameras(cameraType), [cameraType]);

    const [mapContainer, setMap] = React.useState<HTMLDivElement | null>(null);
    const [view, setView] = React.useState<SceneView | undefined>(undefined);

    React.useEffect(() => {
      if (mapContainer === null) return;

      const map = new Map({
        basemap: new Basemap({
          portalItem: {
            // References the 3D Topographic Basemap
            id: '0560e29930dc4d5ebeb58c635c0909c9',
          },
        }),
      });

      const view = new SceneView({
        container: mapContainer,
        map,
        environment: {
          lighting: { directShadowsEnabled: true },
        },
        camera: camera.initialCamera,
        qualityProfile: 'high',
      });

      // Remove all widgets
      view.ui.remove(view.ui.getComponents());

      view.when(() => {
        const labelsLayer = view.map.allLayers.find(({title})=>title==='Places and Labels')
        if(labelsLayer) labelsLayer.visible = false;

        setView(view);
      });
      expose({ camera, map, view });

      return (): void => view.destroy();
    }, [mapContainer, camera]);

    const scoreRef = React.useRef(score);
    const scoreDecreased = scoreRef.current > score;
    const gameCount = React.useRef(0);
    if (scoreDecreased) gameCount.current += 1;
    scoreRef.current = score;
    React.useEffect(() => {
      if (view === undefined) return;
      view.camera = camera.initialCamera;
    }, [view, camera, gameCount.current]);

    useBoard(view, board, camera, isPaused);
    useEffects(view, score);

    return (
      <>
        <div className="w-full h-full" ref={setMap} />
        <div className="absolute top-0 right-0 drop-shadow-[0_1px_2px_#000]">
          <GameAside score={score} nextShape={nextShape} />
        </div>
      </>
    );
  };

export const PanoramaRenderer = mapRenderer('animated');
export const SceneryRenderer = mapRenderer('stationary');
