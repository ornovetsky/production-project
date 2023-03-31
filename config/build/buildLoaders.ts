import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";


// БЭМ блок элемент модификатор .model__content_open способ обеспечить уникальность названий классов
// css modules ает нам возможность использовать одинаковые названия классов, и бандлер потом при сборке
// будет генерировать уникальные названия классов, чтобы не было конфликтов
// webpack.RuleSetRule[]  тип для правил.
// Тайпскрипт мы добавляем чтобы IDE показывало нам ошибки на этапе разработки и предлагало варианты
// если бы юзали обычны йjs нам бы нужно было подключать babel-loader тобы транспилировать новый стандарт
// es6 в старый чтобы все браузера поддеривали его, поддерживает jsx
// typescript лоадера достаточно чтобы транспилировать jsx
export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[]
{
                // Creates `style` nodes from JS strings
    const cssLoader =    {
            test: /\.s[ac]ss$/i,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            auto: Boolean((resPath: string) => resPath.includes('.module.')),
                            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
                        },
                    }
                },
                "sass-loader",
            ],
        }

    const typescriptLoader =         {
        test: /\.tsx?$/,
        use: 'ts-loader',// ts-loader - это загрузчик который будет обрабатывать ts файлы
        exclude: /node_modules/,
    }
    return [
        typescriptLoader, cssLoader
    ]
}
    // rules Одно из самых важных полей, здесь мы конфигурируем загрузчики которые
    // будут обрабатывать наши файлы которые выходят за рамки js, т.е. (png jpg css svg) итд
/*

                        modules: {localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'},
                        // auto: (resPath: string) => {
                        //     Boolean(resPath.includes('.module.'))
                        // },

 */