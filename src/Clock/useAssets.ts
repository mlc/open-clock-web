import { useState, useEffect } from 'react';
import { decode } from 'base64-arraybuffer';
import { ClockAsset } from '../open-clock';
import type { Assets } from './LayerProps';
import { JpegData, readJpegHeader } from '../images/jpeg';
import { PngData, readPngHeader } from '../images/png';

const getDimensions = (
  imageData: ArrayBuffer
): JpegData | PngData | undefined => {
  const arr = new Uint8Array(imageData);

  const jpeg = readJpegHeader(arr);
  if (jpeg) {
    return jpeg;
  }

  const png = readPngHeader(arr);
  if (png) {
    return png;
  }

  return undefined;
};

const clockAssetsToAssets = (clockAssets?: ClockAsset[]): Assets => {
  if (!clockAssets) {
    return {};
  } else {
    return Object.fromEntries(
      clockAssets.flatMap((asset) => {
        const buf = decode(asset.imageData);
        const dimensions = getDimensions(buf);
        if (dimensions) {
          return [
            [
              asset.filename,
              {
                ...dimensions,
                url: URL.createObjectURL(new Blob([buf])),
              },
            ],
          ];
        } else {
          return [];
        }
      })
    );
  }
};

export const useAssets = (clockAssets?: ClockAsset[]): Assets => {
  const [assets, setAssets] = useState<Assets>({});

  useEffect(() => {
    const a = clockAssetsToAssets(clockAssets);
    setAssets(a);
    return () => {
      Object.values(a).forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [clockAssets]);

  return assets;
};
