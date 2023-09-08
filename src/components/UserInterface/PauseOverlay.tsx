import React from 'react';

import { localization } from '../../localization';
import { buttonClassName } from './Components';

export function PauseOverlay({
  onSave: handleSave,
  onLoad: handleLoad,
}: {
  readonly onSave: () => void;
  readonly onLoad: () => void;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center w-screen h-screen text-4xl text-center bg-black/70">
      <div className="flex flex-col gap-8">
        {localization.paused}
        <span>
          {localization.pressKeyToResume(
            <span className="rounded-xl p-px text-black bg-white">
              {localization.esc}
            </span>,
          )}
        </span>
        <div className="flex gap-4">
          <button
            className={buttonClassName}
            type="button"
            onClick={handleSave}
          >
            {localization.saveGame}
          </button>
          <button
            className={buttonClassName}
            type="button"
            onClick={handleLoad}
          >
            {localization.loadGame}
          </button>
        </div>
      </div>
    </div>
  );
}
