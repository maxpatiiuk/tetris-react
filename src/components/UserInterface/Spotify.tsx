import React from 'react';

const playlistId = '0csbygHIwRlqlbW8o4QYGc';

export function Spotify(): JSX.Element {
  return (
    <iframe
      className="rounded absolute bottom-0 left-0 w-[max(30vw,30rem)]"
      src="https://open.spotify.com/embed/album/0csbygHIwRlqlbW8o4QYGc?utm_source=generator&theme=0"
      height="152"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}

/*
import { expose } from '../../lib/utils';

type IframeApi = {
  readonly createController: (
    element: HTMLElement,
    options: { readonly uri: string },
    callback: (controller: EmbedController) => void,
  ) => void;
};
type EmbedController = {
  readonly play: () => void;
  readonly destroy: () => void;
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

  globalSetApi = setApi;

  React.useEffect(() => {
    if (container === null || api === undefined) return;
    let theController: EmbedController | undefined = undefined;
    api.createController(
      container,
      {
        uri: `spotify:playlist:${playlistId}`,
      },
      (controller) => {
        theController = controller;
        expose({ spotify: controller });
      },
    );
    return (): void => {
      theController?.destroy();
    };
  }, [container, api]);

  return (
    <iframe
      className="rounded absolute bottom-0 left-0 w-[max(30vw,30rem)]"
      src="https://open.spotify.com/embed/album/0csbygHIwRlqlbW8o4QYGc?utm_source=generator&theme=0"
      height="152"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      ref={setContainer}
    />
  );
}
*/
