import React from 'react';
import { shapes } from '../../config';
import { useBestScore } from '../../hooks/useCache';
import { hueComponentsToColor } from '../../lib/utils';
import { localization } from '../../localization';
import { RendererProps } from './types';

export function GameAside({
  score,
  nextShapes,
}: Pick<RendererProps, 'score' | 'nextShapes'>): JSX.Element {
  const [bestScore] = useBestScore();
  return (
    <div className="p-2 overflow-hidden">
      <span className="text-4xl">
        {localization.score}
        <span className={score > bestScore ? 'text-red-500' : undefined}>
          {score}
        </span>
      </span>
      <br />
      <span className="pt-2 text-4xl font-mono">
        {nextShapes.map((nextShape, index) => (
          <span
            key={index}
            style={{
              color: hueComponentsToColor(shapes[nextShape].color),
              colorScheme: 'white only',
            }}
          >
            {nextShape}
          </span>
        ))}
      </span>
    </div>
  );
}
