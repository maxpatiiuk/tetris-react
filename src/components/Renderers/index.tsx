import React from 'react';

import { localization } from '../../localization';
import { GridRenderer } from '../GridRenderer';
import { PanoramaRenderer, SceneryRenderer } from '../MapRenderer';
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
    <div className="flex flex-col gap-8 h-full p-8">
      <span className="flex-1" />
      <div className="flex flex-col gap-8">
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
      <div className="flex-1 flex justify-end items-end text-end">
        <span>
          <a
            href="https://github.com/maxxxxxdlp/tetris-react/"
            className="text-blue-500"
            target="_blank"
            rel="noopener"
          >
            {localization.sourceCode}
          </a>
          <br />
          {localization.inspiredBy((label) => (
            <a
              href="https://youtu.be/PFVL6t8IHE8?si=qjVQxbNN9RQQmnud&t=21"
              className="text-blue-500"
              target="_blank"
              rel="noopener"
            >
              {label}
            </a>
          ))}
          <br />
          {localization.instructions}
        </span>
      </div>
    </div>
  );
}
