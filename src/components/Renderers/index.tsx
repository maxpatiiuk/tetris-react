import React from 'react';

import { localization } from '../../localization';
import { GridRenderer } from '../GridRenderer';
import { PanoramaRenderer, SceneryRenderer } from '../MapRenderer/MapRenderer';
import { fancyButtonClassName as buttonClassName } from '../UserInterface/Components';
import type { Renderer } from './types';

const renderers = {
  [localization.panoramaRenderer]: PanoramaRenderer,
  [localization.sceneryRenderer]: SceneryRenderer,
  [localization.gridRenderer]: GridRenderer,
} as const;

export function RendererPick({
  onSelect: handleSelect,
}: {
  readonly onSelect: (renderer: Renderer) => void;
}): JSX.Element {
  return (
    <>
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
    </>
  );
}
