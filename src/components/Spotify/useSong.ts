import React from 'react';
import { RA } from '../../lib/types';

const songs = Object.values({
  '1984': '1YjETQrefLDU6gUdVdjkxK',
  'Starlight Infinite <area X>': '3ICMKtmOim2EQWPGZQlJvm',
  'Singularity X <area X>': '3GR0kABoqo4yYwb0E7CRbt',
  'Butterfly Effect <area X>': '38TW4C6Ozqvpc93ay4E1xO',
  'Butterfly Effect<area X> - Instrumental Mix': '63unOawz5mnIJLhTNdY0B2',
  'Cycle of Silence <area X>': '0y1KtxudTFGVauom0OAw4a',
  'Awakening <area X>': '0Axjc4z6NuEvnI33yfL2Jd',
  'Midnight Sky (Moon Lounge Mix)': '3ObVJtrHe9m1pD0kQjFlnL',
  '1989, Pt. 2': '2FPOAypb6OTKPcVmjs6Fg7',
  Deserve: '38us10664RE7LzKuP0fubG',
  'Into the Darkness': '17GpTGIlK1wj9sTHkmEBVf',
  Roses: '1JtdpEnMkAlRHaqAFZWaiE',
  'Midnight Sky': '35S2ehMIqht4nyMC9trphK',
  Pusher: '0e9Pc6OTaRYbLzAbQcjwD9',
  'Mind Echoes': '3FJ9a6f0Q0onNzAsB1mbqc',
  'Lion Garden': '2yikQFeZTqEVY3pwvOTdKE',
  'All on You': '2zh9jc1IJtUeJoqxK70rki',
  'Deep Dream': '7c9bKzkJ3VcNtmvbzYRFNC',
  Hope: '0gJ3TBmlm3uvbg7w1A47p3',
  'Drowning Valley': '1bQGr0Yb814NklGQLwtJkz',
  Walls: '1ySshlSe4XTK8h9aV7cHlu',
  'Two of Us': '1ebNrHTKWLTacblm1AKjKC',
  'Connected (Yours Forever)': '0QpNG88fUtqBFv3jSPKFzH',
  'World of Colors': '6s6wJWlQOrhutApxBjALcL',
  'Like Never Before': '5rwd85f9zKqEqrLkJy21jl',
  Here: '5DysxV3wWy5BFDjLyKpwJR',
  Hometown: '1afYzACckpTdtIcd6a1jWE',
  "'Aumakua": '0ES5svcsn175HeltIe3w2y',
  Chains: '53YBoGEL4eoqHaiDE2rdFG',
  Snows: '2mXWsRaFeA6MQk51lS4Wgc',
  '3 Senses': '63wf92i45hD2svEtZFaMXi',
  Boscage: '6XtFtwIRnkUMnj6skKX0vF',
  Temptation: '70272Cf8IvttxP4k0dEcI5',
  'New Beginnings': '0a2gqb08h29F854LOcodDi',
  'You and I': '5gbll0kKGZ33zLxS4tP1Ah',
  'Lunar Discourse': '1UguHfmcgaEvZcAXAbPsTI',
  Flames: '0M6lfckrMvgq8tJm9rAfBd',
  'Spring Field': '5V79CYii3UmXypu0ARb8XF',
  'Bright Shadow': '7Bk8zpZzbM3fKk5IEdxvaT',
  Joy: '6XJGtJDhnAZJkNUpEpzmRA',
  'Next Chapter': '1ikwQqffDGOvNWZTC6VodQ',
  'Connected (Yours Forever) [In-Game Mix]': '781SaJ3m5CzRWtx7yycM0e',
  'Connected (Yours Forever) [Obvious Sky Mix]': '0SIGIMjkTPT4msCRdEAf8g',
  'Always Been but Never Dreamed': '0T4pRzSKGRCtq7ZqA3RHdV',
  'So They Say': '2oOB6hUcj70AekyncV54sE',
  'World of Colors (In-Game Mix)': '3uc5T2QGpCtsVsFQ8J7Jlm',
  'Look Up': '01YImcxm3FqgmFSTvDagLc',
  Unfold: '1FzV8n4LhHE06a2lopplyj',
});

const dontRepeatLastSongs = 3;

export function useSong(): () => string {
  const recentlyPlayed = React.useRef<RA<string>>([]);
  return React.useCallback(() => {
    const candidates = songs.filter(
      (song) => !recentlyPlayed.current.includes(song),
    );
    const song = candidates[Math.floor(Math.random() * candidates.length)];
    recentlyPlayed.current = [
      ...recentlyPlayed.current.slice(1, dontRepeatLastSongs),
      song,
    ];
    return `spotify:track:${song}`;
  }, []);
}
