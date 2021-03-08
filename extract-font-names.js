// install freetype2-demos (or equivalent) before running

const { exec } = require('child_process');
const fs = require('fs').promises;
const { join, basename, extname } = require('path');

const pattern = /postscript:\s+(.+)$/m;

const types = { '.ttf': 'truetype', '.otf': 'opentype' };

const extractFontNames = async () => {
  const [, , ...realArgs] = process.argv;
  const dirs = await Promise.all(
    realArgs.map((dir) => fs.readdir(dir).then((results) => [dir, results]))
  );
  const fileNames = dirs
    .flatMap(([dir, files]) => files.map((file) => join(dir, file)))
    .sort();
  const entries = await Promise.all(
    fileNames.map(
      (file) =>
        new Promise((resolve, reject) => {
          exec(`ftdump "${file}"`, { encoding: 'buffer' }, (err, stdout) => {
            if (err) {
              reject(err);
            } else {
              const match = pattern.exec(stdout.toString('utf-8'));
              if (match) {
                resolve([
                  match[1],
                  {
                    path: basename(file),
                    type: types[extname(file).toLowerCase()],
                  },
                ]);
              } else {
                reject(new Error(`couldn't parse ${file}`));
              }
            }
          });
        })
    )
  );
  return Object.fromEntries(entries);
};

const css = (data) => {
  const rules = Object.entries(data).map(
    ([family, { path, type }]) =>
      `@font-face { font-family: "${family}"; src: url('${path}') format('${type}') }`
  );

  return ['/* auto-generated, do not edit */', ...rules].join('\n');
};

extractFontNames()
  .then((data) =>
    Promise.all([
      fs.writeFile('src/fonts.css', css(data)),
      fs.writeFile('src/font-names.json', JSON.stringify(data)),
    ])
  )
  .catch(console.error);
