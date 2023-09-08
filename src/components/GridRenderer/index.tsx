import React from 'react';

import type { Shape } from '../../config';
import { shapes } from '../../config';
import { useBestScore } from '../../hooks/useCache';
import type { RA } from '../../lib/types';
import { localization } from '../../localization';
import type { RendererProps } from '../Renderers/types';
import { hueComponentsToColor } from '../../lib/utils';

export function GridRenderer({
  board,
  score,
  nextShape,
}: RendererProps): JSX.Element {
  return (
    <div
      className="grid grid-cols-4"
      style={{
        width: '100vmin',
        height: '100vmin',
      }}
    >
      <span />
      <Board board={board} />
      <GameAside score={score} nextShape={nextShape} />
    </div>
  );
}

function Board({ board }: { readonly board: RA<RA<Shape>> }): JSX.Element {
  return (
    <div className="bg-gradient-to-tr from-yellow-400 to-purple-400 col-span-2 p-2">
      <div className="h-full grid grid-cols-10 gap-0.5">
        {board.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: hueComponentsToColor(shapes[cell].color),
                }}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function GameAside({
  score,
  nextShape,
}: Pick<RendererProps, 'score' | 'nextShape'>): JSX.Element {
  const [bestScore] = useBestScore();
  return (
    <div className="p-2 overflow-hidden">
      {localization.instructions}
      <br />
      <span className="text-4xl">
        {localization.score}
        <span className={score > bestScore ? 'text-red-500' : undefined}>
          {score}
        </span>
      </span>
      <br />
      {nextShape !== '_' && (
        <span className="pt-2 text-4xl">
          {localization.nextShape}{' '}
          <span
            style={{
              color: hueComponentsToColor(shapes[nextShape].color),
            }}
          >
            {nextShape}
          </span>
        </span>
      )}
    </div>
  );
}
