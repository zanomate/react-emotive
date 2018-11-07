import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import commonjs from 'rollup-plugin-commonjs';
import localResolve from 'rollup-plugin-local-resolve';
import resolve from 'rollup-plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/react-emotive.ts',
    output: [
        {
            file: 'dist/react-emotive.js',
            format: 'umd',
            name: 'React Emotive'
        },
        {
            file: 'dist/react-emotive.cjs.js',
            format: 'cjs',
            name: 'React Emotive',
        },
        {
            file: 'dist/react-emotive.esm.js',
            format: 'es'
        },
    ],
    external: [
        'react',
        'filter-invalid-dom-props',
        'emotive'
    ],
    plugins: [
        typescript(),
        peerDepsExternal(),
        babel({exclude: 'node_modules/**'}),
        localResolve(),
        resolve(),
        commonjs(),
        minify()
    ],
};
