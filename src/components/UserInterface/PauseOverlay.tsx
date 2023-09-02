import React from "react";
import { localization } from "../../localization";
import { fancyButtonClassName } from "./Components";

export function PauseOverlay({
  onSave: handleSave,
  onLoad: handleLoad,
}: {
  readonly onSave: () => void;
  readonly onLoad: () => void;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center w-screen h-screen text-4xl text-center bg-black opacity-75">
      <span>
        {localization.paused}
        <br />
        {localization.pressKeyToResume(
          <span className="rounded-xl p-px text-black bg-white">
            {localization.esc}
          </span>,
        )}
        <br />
        <div className="flex gap-4">
          <button
            type="button"
            className={fancyButtonClassName}
            onClick={handleSave}
          >
            {localization.saveGame}
          </button>
          <button
            type="button"
            className={fancyButtonClassName}
            disabled={localStorage.getItem("state") === null}
            onClick={handleLoad}
          >
            {localization.loadGame}
          </button>
        </div>
      </span>
    </div>
  );
}
