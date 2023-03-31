import {ResolveOptions} from "webpack";

export function buildResolvers(): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
    }
}

//// резолв отвечает за нормальные импорты форматов файлов которые мы вкидываем через Import