const fs = require('fs').promises;
const { basename, join } = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const { extendDefaultPlugins, optimize } = require('svgo');

const config = {
  multipass: true,
  plugins: extendDefaultPlugins([
    { name: 'removeXMLNS' },
    { name: 'removeDimensions' },
  ]),
};

const dir = join(__dirname, 'hands');
fs.readdir(dir)
  .then((files) =>
    Promise.all(
      files.map(async (file) => {
        const data = await fs.readFile(join(dir, file), 'utf8');
        const optim = optimize(data, { ...config, path: file });
        const symbol = basename(file, '.svg');
        return optim.data
          .replace('xml:space="preserve" ', '')
          .replace(/ fill="[^"]+"/g, '')
          .replace(/^<svg/, `<symbol id="${symbol}"`)
          .replace(/<\/svg>$/, '</symbol>');
      })
    )
  )
  .then((symbols) =>
    fs.writeFile(
      'src/hands.svg',
      '<svg xmlns="http://www.w3.org/2000/svg">'
        .concat(...symbols)
        .concat('</svg>')
    )
  );
