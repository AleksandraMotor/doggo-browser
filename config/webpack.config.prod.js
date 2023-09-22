const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/js/app.js',
    },
    output: {
        filename: 'js/[name]-[contenthash:6].js',
        path: path.resolve(__dirname, '../')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name][contenthash:6].[ext]',
                            outputPath: 'img',
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            quality: 70, 
                            progressive: false
                        }
                    }
                ],
                dependency: { not: ['url']},
                
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "nowa aplikacja",
            template: "src/templates/template.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:6].css'
        })
    ]
}