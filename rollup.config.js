import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import pkg from './package.json';

const extensions = ['.js', '.ts', '.tsx'];

const plugins = [
  babel({
    extensions,
    include: ['src/**/*']
  }),
  nodeResolve({
    extensions,
    browser: true
  }),
  commonjs(),
  json()
];

export default [
  {
    external: ['react', '@statickit/core'],
    input: './src/index.ts',
    plugins: plugins,
    output: [
      {
        format: 'cjs',
        file: pkg.main
      },
      {
        format: 'esm',
        file: pkg.module
      }
    ]
  },
  {
    external: ['react'],
    input: './src/index.ts',
    plugins: plugins,
    output: {
      format: 'iife',
      file: __dirname + '/dist/statickit-react.iife.js',
      name: 'StaticKitReact',
      globals: {
        react: 'React'
      }
    }
  }
];
