/*
механизм который позволяет задавать пути еще до сборки , позволяет конфигурировать конфиг
задавать порт, пути, адресс апи и тд режим разработки или продакшн, позволяет управлять извне.
создадим интерфейсы которые опишут билдопшены итд
 */
export type BuildMode = 'production' | 'development';

// это сделано для того чтобы не хардкодить пути в конфиге,
// а получать их извне Опции в которых эти пути указаны

export interface BuildPaths {
    entry: string;// путь до энтрипоинта где будет собираться приложение
    build: string; // путь до папки build
    html: string; // путь до html файла в папке public
}

export interface BuildEnv {
    mode: BuildMode,
    port: number,
}

    export interface BuildOptions {
    mode: BuildMode,
    paths: BuildPaths,
    isDev: boolean,
        port: number,
}