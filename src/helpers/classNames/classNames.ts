//пишем функцию которая комбинирует какие то классы особенно если они навешиваются по какому то условию

// сделаем тип для второго аргумента, Record это тип который позволяет создавать объекты с ключами и значениями,
// в нашем случае ключи это строки, а значения это либо булевые значения либо строки
type Mods = Record<string, boolean | string>


export function classNames(cls: string, mods: Mods, additional: string[]): string {
    return [
        cls,
        ...additional,
        ...Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className]) => className)
    ].join(' ')
}