import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [timeLimit, setTimeLimit] = useState(1);
    const [isRunning, setIsRunning] = useState(false);
    const [repeatCount, setRepeatCount] = useState(1);
    const [timeBetweenRepeats, setTimeBetweenRepeats] = useState(0);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds >= timeLimit) {
                        clearInterval(interval);
                        if (repeatCount > 1) {
                            setTimeout(() => {
                                setSeconds(0);
                                setIsRunning(true);
                                setRepeatCount((prevCount) => prevCount - 1);
                            }, timeBetweenRepeats * 1000);
                        }
                        return prevSeconds;
                    }
                    return prevSeconds + 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRunning, timeLimit, repeatCount, timeBetweenRepeats]);

    const handleTimeLimitChange = (event) => {
        setTimeLimit(parseInt(event.target.value));
    };

    const handleRepeatCountChange = (event) => {
        setRepeatCount(parseInt(event.target.value));
    };

    const handleTimeBetweenRepeatsChange = (event) => {
        setTimeBetweenRepeats(parseInt(event.target.value));
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
        setRepeatCount(1);
        setTimeBetweenRepeats(0);
    };

    return (
        <div>
            <h1 className={isRunning ? 'timerRunning' : 'timer'}>Timer: {seconds} seconds</h1>
            
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
            <br />
            <br />
            <label>
                Select Repeat Count:
                <select value={repeatCount} onChange={handleRepeatCountChange}>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <br />
            <label>
                Select Time Between Repeats (in seconds):
                <select value={timeBetweenRepeats} onChange={handleTimeBetweenRepeatsChange}>
                    {Array.from({ length: 10 }, (_, i) => i).map((value) => (
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
