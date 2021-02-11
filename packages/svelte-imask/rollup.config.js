import { babel } from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import multi from '@rollup/plugin-multi-entry';
import replace from '@rollup/plugin-replace';
import pkg from './package.json';


const globals = {
  imask: 'IMask'
};


export default [
  {
    input: 'src/index.js',
    external: Object.keys(globals),
    output: {
      name: 'SvelteIMask',
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
      globals,
    },
    plugins: [
      eslint({configFile: '../../.eslintrc'}),
      babel({
        rootMode: 'upward',
      }),
    ],
  },
  {
    input: ['src/**/*.js'],
    output: {
      format: 'esm',
      dir: 'esm',
    },
    plugins: [
      replace({
        "import IMask from 'imask'": "import IMask from 'imask/esm/imask'",
        "import 'imask'": "import 'imask/esm'",
        delimiters: ['', ''],
      }),
      multi(),
      babel({
        rootMode: 'upward',
      }),
    ]
  }
]
