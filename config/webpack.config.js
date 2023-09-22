const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, '../', 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    devServer: {
        static: [
        {
            directory: path.join(__dirname, 'public'),
            watch: true,
        }
        ],
        compress: true,
        port: 3000
    },
    module: {
        rules: [
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
            {
                test: /\.scss$/,
                use: [
                'style-loader',
                'css-loader',
                'sass-loader',
                ]
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
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            title: "Best Doggo Browser",
            template: "src/templates/template.html"
        }),
        new CopyPlugin({
            patterns:[
                {
                    from: 'public/img',
                    to: 'img'
                }  
            ]
        })
    ]
};