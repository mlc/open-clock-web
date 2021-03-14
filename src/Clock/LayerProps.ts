import { ClockLayer } from '../open-clock';

export interface Asset {
  url: string;
  width: number;
  height: number;
}

export type Assets = { [key: string]: Asset };

export interface LayerProps {
  layer: ClockLayer;
  position: { x: number; y: number };
  assets: Assets;
}
