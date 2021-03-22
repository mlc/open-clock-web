/* eslint-disable no-continue */
// Author: Thomas Lochmatter, thomas.lochmatter@viereck.ch
// License: MIT

export interface JpegData {
  progressive: boolean;
  bitDepth: number;
  height: number;
  width: number;
  components: number;
}

// Returns an object with the width and height of the JPEG image stored in bytes, or null if the bytes do not represent a JPEG image.
export const readJpegHeader = (bytes: Uint8Array): JpegData | undefined => {
  // JPEG magick
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    return undefined;
  }

  // Go through all markers
  let pos = 2;
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  while (pos + 4 < bytes.byteLength) {
    // Scan for the next start marker (if the image is corrupt, this marker may not be where it is expected)
    if (bytes[pos] !== 0xff) {
      pos += 1;
      continue;
    }

    const type = bytes[pos + 1];

    // Short marker
    pos += 2;
    if (bytes[pos] === 0xff) {
      continue;
    }

    // SOFn marker
    const length = dv.getUint16(pos);
    if (pos + length > bytes.byteLength) {
      return undefined;
    }
    if (length >= 7 && (type === 0xc0 || type === 0xc2)) {
      return {
        progressive: type === 0xc2,
        bitDepth: bytes[pos + 2],
        height: dv.getUint16(pos + 3),
        width: dv.getUint16(pos + 5),
        components: bytes[pos + 7],
      };
    }

    // Other marker
    pos += length;
  }

  return undefined;
};
