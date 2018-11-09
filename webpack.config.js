/* global __dirname, require, module*/

const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, './dist'),
        filename: 'react-emotive.js',
        library: 'react-emotive',
        libraryTarget: 'umd',
        publicPath: '/dist/',
        umdNamedDefine: true
        // globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        }
    },
    plugins: [
        // new CopyPlugin([
        //     './build',
        //     './README.md'
        // ])
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    }
};
