import {createContext} from "react";

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark'
}
//для контекста напишем тип
export interface ThemeContextProps  {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
}

//создаем и экспортируем контекст, нужно сделать и провайдер в отдельном файле
export const ThemeContext = createContext<ThemeContextProps>({});

// посколько важно сохранять значение темы даже опсле того как юзер закрыл браузер, создаем переменную для ключа
// чтобы потом в нужных местах мы могли ее использовать
export const LOCAL_STORAGE_THEME_KEY = 'theme'