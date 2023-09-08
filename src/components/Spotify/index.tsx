import React from 'react';
import { expose } from '../../lib/utils';
import { localization } from '../../localization';
import { useSong } from './useSong';

type IframeApi = {
  readonly createController: (
    element: HTMLElement,
    options: { readonly uri: string; readonly theme?: 'dark' },
    callback: (controller: EmbedController) => void,
  ) => void;
};
type EmbedController = {
  readonly play: () => void;
  readonly loadUri: (uri: string) => void;
  readonly destroy: () => void;
  readonly on: (
    event: 'playback_update',
    callback: (data: {
      readonly data: { readonly duration: number; readonly position: number };
    }) => void,
  ) => () => void;
  readonly iframeElement: HTMLIFrameElement;
};

// Load Spotify API
const script = document.createElement('script');
script.src = 'https://open.spotify.com/embed-podcast/iframe-api/v1';
script.async = true;
document.body.appendChild(script);
Object.defineProperty(window, 'onSpotifyIframeApiReady', {
  configurable: true,
  value: (iframeApi: IframeApi) => {
    globalApi = iframeApi;
    globalSetApi?.(iframeApi);
  },
});
let globalSetApi: ((api: IframeApi) => void) | undefined = undefined;
let globalApi: IframeApi | undefined = undefined;

export function Spotify(): JSX.Element {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const [api, setApi] = React.useState(globalApi);
  const [controller, setController] = React.useState<
    EmbedController | undefined
  >(undefined);

  const getSong = useSong();

  globalSetApi = setApi;

  React.useEffect(
    () =>
      container === null || api === undefined
        ? undefined
        : api.createController(
            // For some reason, their API deletes this element
            document.createElement('div'),
            {
              uri: getSong(),
              theme: 'dark',
            },
            (controller) => {
              container.append(controller.iframeElement);
              controller.play();
              setController(controller);
              expose({ spotify: controller });
            },
          ),
    [container, api, getSong],
  );

  React.useEffect(() => {
    if (controller === undefined) return;

    const removeListener = controller.on(
      'playback_update',
      ({ data: { position, duration } }) => {
        if (position === 0 || position !== duration) return;
        controller.loadUri(getSong());
        controller.play();
      },
    );

    return (): void => {
      removeListener();
      controller?.destroy();
    };
  }, [controller]);

  return (
    <div
      ref={setContainer}
      className={`
        h-20 z-10 absolute top-0 left-0 w-[min(100%,25rem)]
        [&>iframe]:h-full flex flex-row-reverse align-center bg-[#282828]
        rounded-tl-none rounded-lg
      `}
    >
      <button
        title={localization.nextSong}
        aria-label={localization.nextSong}
        className="w-12 h-full p-2 hover:brightness-75"
        onClick={(): void => {
          controller?.loadUri(getSong());
          controller?.play();
        }}
      >
        {nextIcon}
      </button>
    </div>
  );
}

const nextIcon = (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
    />
  </svg>
);
