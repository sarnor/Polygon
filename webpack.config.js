import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//////////////////////////////////
import HtmlWebpackInjector from "html-webpack-injector";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
//////////////////////////////////


import dotenv from 'dotenv';
dotenv.config();

//////////////////////////////////



const webpackConfig = {
    entry: {
        index: './src/app/index.js',
        _index_head: './src/app/_head_index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app/[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.sass$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(svg|png|jpg|jpeg|webp|gif|icon)$/i,
                type: 'asset/resource',
                generator: {
                    filename: path.join('[path][name][ext]'),
                },
            },
            {
                test: /\.(mp3|wav|ogg)$/,
                include: [
                    path.join(__dirname, 'src', "media", "music"),
                ],
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "media/music/[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.(mp4|webm|ogv|3GP)$/,
                include: [
                    path.join(__dirname, 'src', "media", "video"),
                ],
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "media/video/[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                include: [
                    path.resolve(__dirname, 'src', "fonts"),
                ],
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "resource/fonts/[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    sources: {
                        list: [
                            {
                                tag: 'source',
                                attribute: 'src-set',
                                type: 'srcset'
                            },
                            {
                                tag: 'img',
                                attribute: 'data-src',
                                type: 'src'
                            },
                            {
                                tag: 'img',
                                attribute: 'src',
                                type: 'src'
                            },
                            {
                                tag: 'source',
                                attribute: 'srcset',
                                type: 'srcset'
                            },
                            {
                                tag: 'source',
                                attribute: 'data-srcset',
                                type: 'srcset'
                            }
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".html", ".less", ".css", ".sass", ".scss", ".svg", ".jpg", ".webp"],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/index.css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index', '_index_head'],
            inject: 'body',
            title: 'Public',
            favicon: './fav/fav.png'
        }),
        new HtmlWebpackInjector(),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: true,
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                '!.git/**',
                '!.gitignore',
                '!README.md'
            ],
            cleanAfterEveryBuildPatterns: []
        })

    ]
}


export default (env, options) => {
    console.log("🚀 ~ env:", options)
    if (options.mode === 'development') {
        webpackConfig.devtool = 'eval-source-map';
        webpackConfig.devServer = {
            watchFiles: ['src/**/*.html'],
            port: process.env.PORT
        };
    } else if (options.mode === 'production') {
        webpackConfig.devtool = 'source-map';
    }
    return webpackConfig
}
