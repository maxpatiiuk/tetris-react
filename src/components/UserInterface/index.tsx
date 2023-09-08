/**
 * Main Tetris Game's component
 */

import React from 'react';

import { initialSpeed, scoreMultiplier } from '../../config';
import { useGameState } from '../../hooks/useCache';
import type { IR } from '../../lib/types';
import { RendererPick } from '../Renderers';
import type { Renderer } from '../Renderers/types';
import { reducers } from '../State/reducer';
import { Direction } from '../State/types';
import { GameOverOverlay } from './GameOverOverlay';
import { PauseOverlay } from './PauseOverlay';

export function Tetris(): JSX.Element {
  const [renderer, setRenderer] = React.useState<Renderer | undefined>();

  return renderer === undefined ? (
    <RendererPick onSelect={(renderer): void => setRenderer(() => renderer)} />
  ) : (
    <Game
      renderer={renderer}
      onChangeMap={(): void => setRenderer(undefined)}
    />
  );
}

function Game({
  renderer,
  onChangeMap: handleChangeMap,
}: {
  readonly renderer: Renderer;
  readonly onChangeMap: () => void;
}): JSX.Element {
  const [gameOverScore, setGameOverScore] = React.useState<
    number | undefined
  >();
  return (
    <>
      <DisplayRenderer
        isGameOver={typeof gameOverScore === 'number'}
        renderer={renderer}
        onGameOver={setGameOverScore}
      />
      {typeof gameOverScore === 'number' && (
        <GameOverOverlay
          score={gameOverScore}
          onChangeMap={handleChangeMap}
          onRestart={(): void => setGameOverScore(undefined)}
        />
      )}
    </>
  );
}

function DisplayRenderer({
  renderer: Renderer,
  onGameOver: handleGameOver,
  isGameOver,
}: {
  readonly renderer: Renderer;
  readonly onGameOver: (score: number) => void;
  readonly isGameOver: boolean;
}): JSX.Element {
  const [state, setState] = React.useState(reducers.initial);
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
      if (typeof newState === 'object') setState(newState);
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

  React.useEffect(() => {
    if (isGameOver) return undefined;
    setState(reducers.initial);

    function captureKeyDown({ key }: KeyboardEvent): void {
      if (key === 'Escape' || key === 'p')
        setState(reducers.togglePause(stateRef.current));
      else if (key in keyMapping)
        setState(reducers.move(stateRef.current, keyMapping[key]));
    }
    document.addEventListener('keydown', captureKeyDown);
    return (): void => document.removeEventListener('keydown', captureKeyDown);
  }, [isGameOver]);

  return (
    <div className="flex items-center justify-center w-screen h-screen text-white bg-black">
      <Renderer
        board={state.board}
        nextShape={state.nextShape}
        score={state.score}
        isPaused={state.isPaused || isGameOver}
      />
      {state.isPaused && (
        <PauseOverlay
          onLoad={() =>
            setState({
              ...savedState,
              isPaused: false,
            })
          }
          onSave={(): void => setSavedState(state)}
        />
      )}
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
