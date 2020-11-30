const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    mode:'development',
    entry: './src/TabsControl.js',
    output: {
        filename: 'TabsControl.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'tabs-control',
        libraryTarget: 'umd'
    },
    externals: { 
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        },
        "monaco-editor": {
            root: "monaco",
            commonjs2: "monaco-editor",
            commonjs: "monaco-editor",
            amd: "monaco-editor"
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader:'url-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'imgs/',
                    limit: 8192
                }
            },
            {
                test: /\.svg$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        generator: (content) => svgToMiniDataURI(content.toString()),
                    },
                }
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/css',
                    to: './css'
                }
            ],
        }),
        new MonacoWebpackPlugin(['css', 'handlebars', 'html', 'javascript', 'json', 'less', 'markdown', 'xml']),
    ]
};