// Author: Thomas Lochmatter, thomas.lochmatter@viereck.ch
// License: MIT

export interface PngData {
  width: number;
  height: number;
  bitDepth: number;
  colorType: number;
  compressionMethod: number;
  filterMethod: number;
  interlaceMethod: number;
}

// Returns an object with the width and height of the PNG image stored in bytes, or null if the bytes do not represent a PNG image. Only the first 29 bytes are necessary.
export const readPngHeader = (bytes: Uint8Array): PngData | undefined => {
  if (bytes.byteLength < 29) {
    return undefined;
  }

  // PNG header
  if (
    bytes[0] !== 0x89 ||
    bytes[1] !== 0x50 ||
    bytes[2] !== 0x4e ||
    bytes[3] !== 0x47 ||
    bytes[4] !== 0x0d ||
    bytes[5] !== 0x0a ||
    bytes[6] !== 0x1a ||
    bytes[7] !== 0x0a ||
    bytes[12] !== 0x49 ||
    bytes[13] !== 0x48 ||
    bytes[14] !== 0x44 ||
    bytes[15] !== 0x52
  ) {
    return undefined;
  }

  // Header info
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return {
    width: dv.getUint32(16),
    height: dv.getUint32(20),
    bitDepth: bytes[24],
    colorType: bytes[25],
    compressionMethod: bytes[26],
    filterMethod: bytes[27],
    interlaceMethod: bytes[28],
  };
};

// Color types
export const PngColorTypes = {
  Grayscale: 0,
  RGB: 2,
  Palette: 3,
  GrayscaleAlpha: 4,
  RGBA: 6,
};
