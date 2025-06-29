"use client";

import { useState, useEffect } from "react";

interface UseTimerOptions {
  initialTime?: number; // in seconds
  onComplete?: () => void;
}

export const useTimer = ({
  initialTime = 25 * 60,
  onComplete,
}: UseTimerOptions = {}) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setIsActive(false);
      if (onComplete) onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, onComplete]);

  // Toggle timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset timer
  const resetTimer = (newTime: number = initialTime) => {
    setIsActive(false);
    setTime(newTime);
  };

  return {
    time,
    isActive,
    toggleTimer,
    resetTimer,
    formattedTime: formatTime(time),
  };
};

export default useTimer;
