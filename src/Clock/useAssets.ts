import * as React from 'react';
import { decode } from 'base64-arraybuffer';
import { ClockAsset } from '../open-clock';
import type { Asset, Assets } from './LayerProps';
import { readJpegHeader } from '../images/jpeg';
import { readPngHeader } from '../images/png';

const getDimensions = (
  imageData: ArrayBuffer
): Pick<Asset, 'width' | 'height'> | undefined => {
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
        return dimensions
          ? [
              [
                asset.filename,
                {
                  ...dimensions,
                  url: URL.createObjectURL(new Blob([buf])),
                },
              ],
            ]
          : [];
      })
    );
  }
};

export const useAssets = (clockAssets?: ClockAsset[]): Assets => {
  const [assets, setAssets] = React.useState<Assets>({});

  React.useEffect(() => {
    const a = clockAssetsToAssets(clockAssets);
    setAssets(a);
    return () => {
      Object.values(a).forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [clockAssets]);

  return assets;
};
