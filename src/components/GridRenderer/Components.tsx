/*
 * React components
 */

import React from 'react';

import type { SHAPES } from '../../../const/projects/tetris/config';

export function Cell({
  color,
}: {
  readonly color: (typeof SHAPES)[string]['color'];
}): JSX.Element {
  return (
    <div
      style={{
        backgroundColor: color,
      }}
    />
  );
}
