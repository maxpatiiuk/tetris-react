import React from "react";
import { useBestScore } from "../../hooks/useCache";
import { localization } from "../../localization";
import { fancyButtonClassName } from "./Components";

export function GameOverOverlay({
  score,
  onRestart: handleRestart,
}: {
  readonly score: number;
  onRestart: () => void;
}): JSX.Element {
  const [bestScore, setBestScore] = useBestScore();
  const previousBestScore = React.useRef(bestScore).current;

  React.useEffect(
    () => setBestScore(Math.max(bestScore, score)),
    [score, bestScore],
  );

  return (
    <div className="flex items-center justify-center text-3xl text-center">
      <span>
        <h1 className="pb-4 text-6xl">{localization.gameOver}</h1>
        <h2>
          {localization.yourScore} {score}
        </h2>
        <h2>
          {localization.yourBestScore} {previousBestScore}
        </h2>
        <button
          type="button"
          className={fancyButtonClassName}
          onClick={handleRestart}
        >
          {localization.playAgain}
        </button>
      </span>
    </div>
  );
}
