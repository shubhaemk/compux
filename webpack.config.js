const path = require('path');
const webpack = require('webpack');

const webpackConfig = () => {
    return {
        mode: 'production',
        target: 'node',
        entry: path.resolve(__dirname,'src/index.js'),
        output: {
            path: path.resolve(__dirname,'bin'),
            filename: 'index.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: path.resolve(__dirname,'node_modules'),
                    use: [
                        {
                            loader: 'babel-loader',
                            query: {
                                configFile: path.resolve(__dirname,'babel.config.js')
                            }
                        },
                        {
                            loader: 'shebang-loader'
                        }
                    ]       
                }
            ]
        },
        plugins: [
            new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
        ]
    }
}


module.exports = webpackConfig;
