import webpack from 'webpack'
import {buildWebpackConfig} from "./config/build/buildWebpackConfig";
import {BuildEnv, BuildPaths} from "./config/build/types/config";
import path from "path";

// wepback.config.ts options > buildWebpackConfig > buildLoaders > buildPlugins > buildDevServer
//принимает енв переменную окружения
// чтобы функция принимала параметры окружения и возвращала конфиг
export default (env: BuildEnv) => {
const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html')
}

const mode = env.mode || 'development'
const PORT = env.port || 3000;

const isDev = mode === 'development'

const config: webpack.Configuration = buildWebpackConfig({
    mode, // режим сборки
    paths,
    isDev: isDev,
    port: PORT,
})
    return config
}


