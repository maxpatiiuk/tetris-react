/**
 * Main Tetris Game's component
 */

import React from "react";
import { initialSpeed, scoreMultiplier } from "../../config";
import { Direction } from "../State/types";
import { IR } from "../../lib/types";
import { getInitialState } from "../State/StateReducer";
import { Renderer } from "../Renderers/types";
import { RendererPick } from "../Renderers";
import { reducers } from "../State/reducer";
import { useGameState } from "../../hooks/useCache";
import { GameOverOverlay } from "./GameOver";
import { PauseOverlay } from "./PauseOverlay";

export function Tetris(): JSX.Element {
  const [renderer, setRenderer] = React.useState<Renderer | undefined>();

  return renderer === undefined ? (
    <RendererPick onSelect={(renderer): void => setRenderer(() => renderer)} />
  ) : (
    <Game renderer={renderer}></Game>
  );
}
function Game({ renderer }: { renderer: Renderer }): JSX.Element {
  const [gameOverScore, setGameOverScore] = React.useState<
    number | undefined
  >();
  return (
    <>
      <DisplayRenderer
        isGameOver={typeof gameOverScore === "number"}
        renderer={renderer}
        onGameOver={setGameOverScore}
      />
      {typeof gameOverScore === "number" && (
        <GameOverOverlay
          score={gameOverScore}
          onRestart={(): void => setGameOverScore(undefined)}
        />
      )}
    </>
  );
}
``;

function DisplayRenderer({
  renderer: Renderer,
  onGameOver: handleGameOver,
  isGameOver,
}: {
  renderer: Renderer;
  onGameOver: (score: number) => void;
  isGameOver: boolean;
}): JSX.Element {
  const [state, setState] = React.useState(getInitialState);
  const stateRef = React.useRef(state);
  stateRef.current = state;

  const [savedState, setSavedState] = useGameState();

  React.useEffect(() => {
    function gameLoop(): void {
      const newState = reducers.gravity(
        stateRef.current,
        // Need to give a seed here, since the reducer is pure
        Math.floor(Math.random() * 100),
      );
      if (typeof newState === "object") setState(newState);
      else handleGameOver(stateRef.current.score);
    }
    gameLoop();

    const interval = setInterval(
      gameLoop,
      // Speed grows logarithmically
      initialSpeed / Math.log(3 + state.score / scoreMultiplier),
    );
    return (): void => clearInterval(interval);
  }, [state.score]);

  function captureKeyDown({ key }: KeyboardEvent): void {
    if (key === "Escape" || key === "p")
      setState(reducers.togglePause(stateRef.current));
    else if (key in keyMapping)
      setState(reducers.move(stateRef.current, keyMapping[key]));
  }

  React.useEffect(() => {
    if (isGameOver) return undefined;
    setState(getInitialState);
    document.addEventListener("keydown", captureKeyDown);
    return (): void => document.removeEventListener("keydown", captureKeyDown);
  }, [isGameOver]);

  return (
    <div className="flex items-center justify-center w-screen h-screen text-white bg-black">
      <PauseOverlay
        onSave={(): void => setSavedState(state)}
        onLoad={() =>
          setState({
            ...savedState,
            paused: false,
          })
        }
      />
      <Renderer
        board={state.board}
        score={state.score}
        nextShape={state.nextShape}
      />
    </div>
  );
}

const keyMapping: IR<Direction> = {
  ArrowUp: Direction.UP,
  ArrowDown: Direction.DOWN,
  ArrowLeft: Direction.LEFT,
  ArrowRight: Direction.RIGHT,
  w: Direction.UP,
  s: Direction.DOWN,
  a: Direction.LEFT,
  d: Direction.RIGHT,
  // For Vim users :)
  k: Direction.UP,
  j: Direction.DOWN,
  h: Direction.LEFT,
  l: Direction.RIGHT,
};
