import React from 'react';

export const localization = {
  title: 'Tetris React',
  paused: 'Game is paused',
  esc: 'ESC',
  pressKeyToResume: (key: JSX.Element): JSX.Element => (
    <>Press {key} to resume</>
  ),
  instructions:
    'Control the game using WSAD or arrow keys. Pause using the ESC key',
  score: 'Score: ',
  gameOver: 'Game Over!',
  yourScore: 'Your score was: ',
  yourBestScore: 'Your best score is: ',
  playAgain: 'Play again?',
  nextShape: 'Next Shape: ',
  saveGame: 'Save game',
  loadGame: 'Load game',
  panoramaRenderer: 'Panorama World',
  sceneryRenderer: 'Scenery World',
  gridRenderer: 'Grid World',
  changeMap: 'Change Map',
  nextSong: 'Next Song',
};
