import React, {FC, useMemo, useState} from 'react';
import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from './ThemeContext';
//провайдер представляет из себя компонент который возвращает из контекста провайдер

//берем значение из локал стораджа, если его нет то по умолчанию будет светлая тема
const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

//посколько мы провайдером будем оборачивать другой компонент, его нужно пропсом получать
//тип чилдрен можно получить задав компонент тип FC
//этот провайдер потом ипользуем в корневом компоненте index.tsx где мы можем корневой компонент App обернуть
//логику по переключениую темы вынесем в отдельный хук UseTheme
const ThemeProvider: FC = ({children}) => {
    //эти функции мы инкапсулировали на уровне провайдера
    const [theme,setTheme] = useState<Theme>(defaultTheme);

    //если прокинуть в Value объект, то этот объект будет пересоздаваться каждый раз при ререндере,
    // это не оптимально потому что объект каждый раз будет новый, ссылка на него будет новая, и компонент
    //будет перерендериваться
    const defaultProps = useMemo(() => ({
        theme: theme,
        setTheme: setTheme,
    }), [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;