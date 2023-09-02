import { Renderer } from './types';
import { localization } from '../../localization';
import { GridRenderer } from '../GridRenderer';

export const renderers = {
  [localization.panoramaRenderer]: GridRenderer,
  [localization.gridRenderer]: GridRenderer,
  [localization.sceneryRenderer]: GridRenderer,
} as const;

export function RendererPick({
  onSelect: handleSelect,
}: {
  readonly onSelect: (renderer: Renderer) => void;
}): JSX.Element {}
