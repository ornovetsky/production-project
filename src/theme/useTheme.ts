import {useContext} from "react";
import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from "./ThemeContext";

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    // получаем доступ к созданному контексту в ThemeContext и стейтом с сеттером из themeProvider. с темой и его триггерами
    // получается что мы получаем доступ к функционалу который был создан в провайдере
    const {theme, setTheme} = useContext(ThemeContext)

    const toggleTheme = () => {
        //начнем сохранять в локалстораге заданную тему
        const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        setTheme(newTheme)
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }
    return {theme, toggleTheme}

}