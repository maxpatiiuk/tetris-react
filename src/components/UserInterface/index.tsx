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
import { Spotify } from '../Spotify';

export function Tetris(): JSX.Element {
  const [renderer, setRenderer] = React.useState<Renderer | undefined>();
  const [startedGame, setStartedGame] = React.useState(false);

  return (
    <>
      {renderer === undefined ? (
        <RendererPick
          onSelect={(renderer): void => {
            setStartedGame(true);
            setRenderer(() => renderer);
          }}
        />
      ) : (
        <Game
          renderer={renderer}
          onChangeMap={(): void => setRenderer(undefined)}
        />
      )}
      {startedGame && <Spotify />}
    </>
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
        onChangeMap={handleChangeMap}
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
  isGameOver,
  onGameOver: handleGameOver,
  onChangeMap: handleChangeMap,
}: {
  readonly renderer: Renderer;
  readonly isGameOver: boolean;
  readonly onGameOver: (score: number) => void;
  readonly onChangeMap: () => void;
}): JSX.Element {
  const [state, setState] = React.useState(reducers.initial);
  const stateRef = React.useRef(state);
  stateRef.current = state;

  const [savedState, setSavedState] = useGameState();

  React.useEffect(() => {
    if (isGameOver) return undefined;
    function gameLoop(): void {
      const { isGameOver = false, ...newState } = reducers.gravity(
        stateRef.current,
        // Need to give a seed here to keep the reducer pure
        Math.floor(Math.random() * 100),
      );
      if (isGameOver) handleGameOver(stateRef.current.score);
      setState(newState);
    }
    gameLoop();

    const interval = setInterval(
      gameLoop,
      // Speed grows logarithmically
      initialSpeed / Math.log(3 + state.score / scoreMultiplier),
    );
    return (): void => clearInterval(interval);
  }, [state.score, isGameOver]);

  React.useEffect(() => {
    if (isGameOver) return undefined;
    setState(reducers.initial);

    function captureKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape' || event.key === 'p')
        setState(reducers.togglePause(stateRef.current));
      else if (event.key in keyMapping) {
        setState(reducers.move(stateRef.current, keyMapping[event.key]));
        event.preventDefault();
        event.stopPropagation();
      }
    }
    document.addEventListener('keydown', captureKeyDown, { capture: true });
    return (): void =>
      document.removeEventListener('keydown', captureKeyDown, {
        capture: true,
      });
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
          onChangeMap={handleChangeMap}
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
