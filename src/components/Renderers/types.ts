import type { Shape } from '../../config';
import type { RA } from '../../lib/types';

export type RendererProps = {
  readonly board: RA<RA<Shape>>;
  readonly score: number;
  readonly nextShapes: RA<Shape>;
  readonly isPaused: boolean;
};

export type Renderer = (props: RendererProps) => JSX.Element;
