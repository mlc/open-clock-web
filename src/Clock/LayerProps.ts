import type { ClockLayer } from '../open-clock';

export interface Asset {
  url: string;
  width: number;
  height: number;
}

export type Assets = Readonly<Record<string, Readonly<Asset>>>;

export interface LayerProps {
  layer: ClockLayer;
  position: { x: number; y: number };
  assets: Assets;
}
