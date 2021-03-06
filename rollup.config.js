import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import emitEJS from 'rollup-plugin-emit-ejs';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import sizes from 'rollup-plugin-sizes';
import { terser } from 'rollup-plugin-terser';
import postcssEnv from 'postcss-preset-env';

const DEV = process.env.NODE_ENV === 'development';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const postCssPlugins = [postcssEnv];

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  nodeResolve({ extensions }),
  commonjs(),
  babel({
    extensions,
    babelHelpers: 'runtime',
  }),
  postcss({
    modules: true,
    extract: true,
    plugins: postCssPlugins,
  }),
  emitEJS({ src: 'src' }),
  sizes(),
];

if (DEV) {
  plugins.push(
    serve({
      contentBase: ['dist'],
      open: true,
    })
  );
} else {
  plugins.push(htmlMinifier({ collapseWhitespace: true }), terser());
}

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: DEV ? 'inline' : true,
    entryFileNames: '[name].[hash].js',
  },
  plugins,
};
