import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {BuildOptions} from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

// у плагинов есть типизация. Здесь мы делаем декомпозицию конфига из webpack.config.ts чтобы избежать нагромождения. в конфиге мы вызовем эту функцию и она вернет плагины
export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {
    const {paths} = options
    return [
        new HtmlWebpackPlugin({ template: paths.html }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[id].[contenthash:8].css',
        })
    ]
}
