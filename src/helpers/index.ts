export const secondToMinutesTextFormat = (second: number): string => {
    if (second > 60) {
        return `${Math.floor(second / 60)} 분 ${second % 60} 초`
    }

    return `${second} 초`
} 

