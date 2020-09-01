const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/app.tsx',
    mode: 'development',

    devServer: {
        contentBase: './public',
        publicPath: '/dist/'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },

    plugins: [
        new webpack.ProvidePlugin({
            Hulu: [path.resolve(__dirname, './src/hulu'), 'default']
        })
    ],

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            [
                                '@babel/plugin-transform-react-jsx',
                                {
                                    pragma: 'Hulu.createElement'
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    }
};
