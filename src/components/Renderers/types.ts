import type { Shape } from '../../config';
import type { RA } from '../../lib/types';

export type RendererProps = {
  readonly board: RA<RA<Shape>>;
  readonly score: number;
  readonly nextShape: Shape;
  readonly isPaused: boolean;
};

export type Renderer = (props: RendererProps) => JSX.Element;
