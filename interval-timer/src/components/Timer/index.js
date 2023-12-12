import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [timeLimit, setTimeLimit] = useState(1);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds >= timeLimit) {
                        clearInterval(interval);
                        return prevSeconds;
                    }
                    return prevSeconds + 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLimit]);

    const handleTimeLimitChange = (event) => {
        setTimeLimit(parseInt(event.target.value));
    };

    const handleStart = () => {
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setSeconds(0);
    };

    return (
        <div>
            <h1>Timer: {seconds} seconds</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button>
            <br />
            <br />
            <label>
                Select Time Limit:
                <select value={timeLimit} onChange={handleTimeLimitChange}>
                    {Array.from({ length: 60 }, (_, i) => i + 1).map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default Timer;

