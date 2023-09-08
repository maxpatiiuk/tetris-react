import React from 'react';

const playlistId = '0csbygHIwRlqlbW8o4QYGc';

export function Spotify(): JSX.Element {
  return (
    <iframe
      className="rounded absolute bottom-0 left-0 w-[max(30vw,30rem)]"
      src={`https://open.spotify.com/embed/album/${playlistId}?utm_source=generator&theme=0`}
      height="152"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
