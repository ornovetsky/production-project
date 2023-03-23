// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack'); //to access built-in plugins
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'


//делаем конфиг на тс чтобы пользоваться прелестями автокомплита
const config: webpack.Configuration = {
    mode: "development", // режим сборки
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    // path - склеить участки пути. __dirname это текущая директория(корневая)
    // через запятую указ. участки пути. путь для стартовой точки приложения index.ts
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',// ts-loader - это загрузчик который будет обрабатывать ts файлы
                exclude: /node_modules/,
            }], // rules Одно из самых важных полей, здесь мы конфигурируем загрузчики которые
        // будут обрабатывать наши файлы которые выходят за рамки js, т.е. (png jpg css svg) итд
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    }, // резолв отвечает за нормальные импорты форматов файлов которые мы вкидываем через Import
    output: {
        filename: "[name].[contenthash].js", // главный файл сборки нашего приложения
        // filename [] - это шаблон, который будет заменен на имя файла
        path: path.resolve(__dirname, 'build'), // путь куда будет собираться наше приложение
        clean: true, // очищать папку build перед каждой сборкой
        //необходимо сообщить вебпаку где находится файл Index.js в этот файлик нужно будет
        // встраивать js скрипты которые мы будем писать
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
        // template чтобы использовать index.html как шаплон
    ],
    // output - настройка того куда и как мы будем делать сборку нашего приложения
    // чтобы собрать сборку достаточно написать в терминале webpack
}

export default config


/*
Caching problems in webpack occur when the browser caches old versions of your
bundled files. This can lead to users not receiving the latest updates when you
deploy changes to your app.
To resolve this, webpack uses contenthash for the filename. contenthash is a
unique hash generated based on the content of the file. When the file content
changes, the hash also changes, resulting in a new filename. This ensures that
browsers request the updated file instead of using the old cached version,
 */