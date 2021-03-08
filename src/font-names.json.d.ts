interface FontDescriptor {
  path: string;
  type: 'ttf' | 'otf';
}

declare const fontNames: { [family: string]: FontDescriptor };
export = fontNames;
