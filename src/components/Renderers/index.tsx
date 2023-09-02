import { Renderer } from './types';
import { localization } from '../../localization';
import { GridRenderer } from '../GridRenderer';
import { PanoramaRenderer, SceneryRenderer } from '../MapRenderer/MapRenderer';
import { fancyButtonClassName as buttonClassName } from '../UserInterface/Components';
import React from 'react';

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
          key={label}
          type="button"
          className={buttonClassName}
          onClick={(): void => handleSelect(renderer)}
        >
          {label}
        </button>
      ))}
    </>
  );
}
