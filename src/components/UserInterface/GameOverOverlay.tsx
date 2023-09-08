import React from 'react';

import { useBestScore } from '../../hooks/useCache';
import { localization } from '../../localization';
import { buttonClassName } from './Components';

export function GameOverOverlay({
  score,
  onRestart: handleRestart,
  onChangeMap: handleChangeMap,
}: {
  readonly score: number;
  readonly onRestart: () => void;
  readonly onChangeMap: () => void;
}): JSX.Element {
  const [bestScore, setBestScore] = useBestScore();
  const previousBestScore = React.useRef(bestScore).current;

  React.useEffect(
    () => setBestScore(Math.max(bestScore, score)),
    [score, bestScore],
  );

  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-3xl text-center">
      <span>
        <h1 className="pb-4 text-6xl">{localization.gameOver}</h1>
        <h2>
          {localization.yourScore} {score}
        </h2>
        <h2>
          {localization.yourBestScore} {previousBestScore}
        </h2>
        <div className="flex gap-4">
          <button
            className={buttonClassName}
            type="button"
            onClick={handleRestart}
          >
            {localization.playAgain}
          </button>
          <button
            className={buttonClassName}
            type="button"
            onClick={handleChangeMap}
          >
            {localization.changeMap}
          </button>
        </div>
      </span>
    </div>
  );
}
