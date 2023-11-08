import React, { useCallback, useEffect, useState } from 'react';

const useTimer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState(60 * 25);
    const reset = useCallback(() => setCurrentTime(60 * 25), [])

    useEffect(() => {
        let timerId = null;
        if (isRunning) timerId = setInterval(() => {
            setCurrentTime((time) => time - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [isRunning])

    return {
        isRunning,
        setIsRunning,
        reset,
        currentTime
    }
}

export default useTimer;