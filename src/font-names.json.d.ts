interface FontDescriptor {
  path: string;
  type: 'truetype' | 'opentype';
}

declare const fontNames: { [family: string]: FontDescriptor };
export = fontNames;
