//сюда перенесем всю конфигурацию которую мы делали в корне проекта
// этот конфиг делается для удобства и большей гибкости
import webpack from "webpack";
import {BuildOptions} from "./types/config";
import path from "path";
import {buildPlugins} from "./buildPlugins";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";
import {buildDevServer} from "./buildDevServer";

//делаем конфиг на тс чтобы пользоваться прелестями автокомплита
// последовательность того как мы возвращает конфиги из функций важна
// декомпозиция позволяет упростить конфиг и четко видеть последовательность вовзрата конфигов

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const {paths, mode, isDev} = options;
    return {
        mode: mode, // режим сборки
        entry: paths.entry,
        // path - склеить участки пути. __dirname это текущая директория(корневая)
        // через запятую указ. участки пути. путь для стартовой точки приложения index.tsx
        // output - настройка того куда и как мы будем делать сборку нашего приложения
        // чтобы собрать сборку достаточно написать в терминале webpack
        output: {
            filename: "[name].[contenthash].js", // главный файл сборки нашего приложения
            // filename [] - это шаблон, который будет заменен на имя файла
            path: paths.build, // путь куда будет собираться наше приложение
            clean: true, // очищать папку build перед каждой сборкой
            //необходимо сообщить вебпаку где находится файл Index.js в этот файлик нужно будет
            // встраивать js скрипты которые мы будем писать
        },
        plugins: buildPlugins(options),
        // плагины важнейшая часть вебпака
        module: {
            rules: buildLoaders(options),
            // rules Одно из самых важных полей, здесь мы конфигурируем загрузчики которые
            // будут обрабатывать наши файлы которые выходят за рамки js, т.е. (png jpg css svg) итд
        },
        resolve: buildResolvers(), // резолв отвечает за нормальные импорты форматов файлов которые мы вкидываем через Import
        devtool: isDev ? 'inline-source-map' : undefined, // чтобы видеть где конкретно у нас ошибка в коде
        devServer: isDev ? buildDevServer(options) : undefined, // конфиг для devServer
// это условие позволяет не запускать devServer в режиме production и делать сорсмапы только в режиме разработки
    }
}


/*
Caching problems in webpack occur when the browser caches old versions of your
bundled files. This can lead to users not receiving the latest updates when you
deploy changes to your app.
To resolve this, webpack uses contenthash for the filename. contenthash is a
unique hash generated based on the content of the file. When the file content
changes, the hash also changes, resulting in a new filename. This ensures that
browsers request the updated file instead of using the old cached version,
 */