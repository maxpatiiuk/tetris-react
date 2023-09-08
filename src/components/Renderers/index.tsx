import React from 'react';

import { localization } from '../../localization';
import { GridRenderer } from '../GridRenderer';
import { PanoramaRenderer, SceneryRenderer } from '../MapRenderer/MapRenderer';
import { buttonClassName as buttonClassName } from '../UserInterface/Components';
import type { Renderer } from './types';

const renderers = {
  [localization.sceneryRenderer]: SceneryRenderer,
  [localization.panoramaRenderer]: PanoramaRenderer,
  [localization.gridRenderer]: GridRenderer,
} as const;

export function RendererPick({
  onSelect: handleSelect,
}: {
  readonly onSelect: (renderer: Renderer) => void;
}): JSX.Element {
  return (
    <div className="flex flex-col gap-8 h-full justify-center p-8">
      <h1 className="text-5xl">{localization.title}</h1>
      <div className="flex gap-4">
        {Object.entries(renderers).map(([label, renderer]) => (
          <button
            className={buttonClassName}
            key={label}
            type="button"
            onClick={(): void => handleSelect(renderer)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
