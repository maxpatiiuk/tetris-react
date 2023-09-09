import React from 'react';

import type { Shape } from '../../config';
import { shapes } from '../../config';
import type { RA } from '../../lib/types';
import type { RendererProps } from '../Renderers/types';
import { hueComponentsToColor } from '../../lib/utils';
import { GameAside } from '../Renderers/GameAside';

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
