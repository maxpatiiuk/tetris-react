/*
 * State Reducer
 */

import React from 'react';
import type { State } from 'typesafe-reducer';
import { generateReducer } from 'typesafe-reducer';
import { RR } from '../../lib/types';
import { BOARD_X, BOARD_Y, SHAPES } from '../../config';
import { Actions } from './reducer';
import { fancyButtonStyles } from '../UserInterface/Components';
import { localization } from '../../localization';
import { Cell } from '../GridRenderer/components';

type GameOverState = State<
  'GameOverState',
  {
    score: number;
    bestScore: number;
  }
>;

export type ShapeLocationWritable = Record<number, Record<number, boolean>>;
export type ShapeLocation = RR<number, RR<number, boolean>>;

export type MainState = State<
  'MainState',
  {
    board: readonly (readonly (keyof typeof SHAPES)[])[];
    score: number;
    bestScore: number;
    currentShape: keyof typeof SHAPES;
    currentShapeLocation: ShapeLocation;
    nextShape: keyof typeof SHAPES;
    paused: boolean;
  }
>;

export type States = MainState | GameOverState;

export function mainState(state: States): MainState {
  if (state.type !== 'MainState')
    throw new Error('Action called from wrong state');
  return state;
}

export function gameOverState(state: MainState): GameOverState {
  const newState: GameOverState = {
    type: 'GameOverState',
    score: state.score,
    bestScore: state.score > state.bestScore ? state.score : state.bestScore,
  };

  localStorage.setItem('highScore', newState.bestScore.toString());

  return newState;
}

export const getInitialState = (bestScore = 0): MainState => ({
  type: 'MainState',
  board: Array.from<MainState['board'][number]>({ length: BOARD_Y }).fill(
    Array.from<MainState['board'][number][number]>({ length: BOARD_X }).fill(
      '_'
    )
  ),
  currentShapeLocation: {},
  currentShape: '_',
  nextShape: '_',
  score: 0,
  bestScore,
  paused: false,
});

type StatesWithParameters = States & {
  parameters: {
    dispatch: (action: Actions) => void;
  };
};

export const stateReducer = generateReducer<JSX.Element, StatesWithParameters>({
  MainState({ action: { parameters, ...state } }) {
    return (
      <div
        className="grid grid-cols-4"
        style={{
          width: '100vmin',
          height: '100vmin',
        }}
      >
        <span />
        {state.paused && (
          <div className="absolute inset-0 flex items-center justify-center w-screen h-screen text-4xl text-center bg-black opacity-75">
            <span>
              {localization.paused}
              <br />
              {localization.pressKeyToResume(
                <span className="rounded-xl p-px text-black bg-white">
                  {localization.esc}
                </span>
              )}
              <br />
              <div className="flex gap-4">
                <button
                  type="button"
                  className={fancyButtonStyles}
                  onClick={(): void =>
                    parameters.dispatch({
                      type: 'SaveGameAction',
                    })
                  }
                >
                  {localization.saveGame}
                </button>
                <button
                  type="button"
                  className={fancyButtonStyles}
                  disabled={localStorage.getItem('state') === null}
                  onClick={(): void =>
                    parameters.dispatch({
                      type: 'LoadGameAction',
                    })
                  }
                >
                  {localization.loadGame}
                </button>
              </div>
            </span>
          </div>
        )}
        <div className="bg-gradient-to-tr from-yellow-400 to-purple-400 col-span-2 p-2">
          <div className="h-full grid grid-cols-10 gap-0.5">
            {state.board.map((row, index) => (
              <React.Fragment key={index}>
                {row.map((cell, index) => (
                  <Cell key={index} color={SHAPES[cell].color} />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="p-2 overflow-hidden">
          {localization.instructions}
          <br />
          <span className="text-4xl">
            {localization.score}
            <span
              className={
                state.score > state.bestScore ? 'text-red-500' : undefined
              }
            >
              {state.score}
            </span>
          </span>
          <br />
          {state.nextShape !== '_' && (
            <span className="pt-2 text-4xl">
              {localization.nextShape}{' '}
              <span
                style={{
                  color: SHAPES[state.nextShape].color,
                }}
              >
                {state.nextShape}
              </span>
            </span>
          )}
        </div>
      </div>
    );
  },
  GameOverState({ action: { parameters, ...state } }) {
    return (
      <div className="flex items-center justify-center text-3xl text-center">
        <span>
          <h1 className="pb-4 text-6xl">{localization.gameOver}</h1>
          <h2>
            {localization.yourScore} {state.score}
          </h2>
          <h2>
            {localization.yourBestScore} {state.bestScore}
          </h2>
          <button
            type="button"
            className={fancyButtonStyles}
            onClick={(): void =>
              parameters.dispatch({ type: 'RestartGameAction' })
            }
          >
            {localization.playAgain}
          </button>
        </span>
      </div>
    );
  },
});
