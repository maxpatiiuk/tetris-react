import React from 'react';
import { shapes } from '../../config';
import { useBestScore } from '../../hooks/useCache';
import { hueComponentsToColor } from '../../lib/utils';
import { localization } from '../../localization';
import { RendererProps } from './types';

export function GameAside({
  score,
  nextShape,
}: Pick<RendererProps, 'score' | 'nextShape'>): JSX.Element {
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
      {nextShape !== '_' && (
        <span className="pt-2 text-4xl">
          {localization.nextShape}{' '}
          <span
            style={{
              color: hueComponentsToColor(shapes[nextShape].color),
              colorScheme: 'white only',
            }}
          >
            {nextShape}
          </span>
        </span>
      )}
    </div>
  );
}
