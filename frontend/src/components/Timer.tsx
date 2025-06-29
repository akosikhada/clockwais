"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

interface TimerProps {
  initialTime?: number; // in seconds
  onSessionComplete?: () => void;
  currentSession?: number;
  totalSessions?: number;
}

const Timer = ({
  initialTime = 25 * 60, // 25 minutes in seconds by default
  onSessionComplete = () => {},
  currentSession = 1,
  totalSessions = 4,
}: TimerProps) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("focus");

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
      onSessionComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, onSessionComplete]);

  // Handle mode change
  const handleModeChange = (value: string) => {
    setMode(value);
    setIsActive(false);

    // Set appropriate time based on mode
    switch (value) {
      case "focus":
        setTime(25 * 60); // 25 minutes
        break;
      case "shortBreak":
        setTime(5 * 60); // 5 minutes
        break;
      case "longBreak":
        setTime(15 * 60); // 15 minutes
        break;
      default:
        setTime(25 * 60);
    }
  };

  // Toggle timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
      {/* Timer Mode Tabs */}
      <div className="flex items-center gap-1 mb-10 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/30">
        <button
          onClick={() => handleModeChange("focus")}
          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 button-hover ${
            mode === "focus"
              ? "primary-gradient text-white shadow-lg glow-effect"
              : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          Focus
        </button>
        <button
          onClick={() => handleModeChange("shortBreak")}
          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 button-hover ${
            mode === "shortBreak"
              ? "primary-gradient text-white shadow-lg glow-effect"
              : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => handleModeChange("longBreak")}
          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 button-hover ${
            mode === "longBreak"
              ? "primary-gradient text-white shadow-lg glow-effect"
              : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          Long Break
        </button>
      </div>

      {/* Timer Circle */}
      <div className="relative flex items-center justify-center w-96 h-96 rounded-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white mb-8 shadow-2xl border-8 border-white/20">
        {/* Progress Ring */}
        <div className="absolute inset-4 rounded-full border-4 border-white/10"></div>
        <div className="absolute inset-8 rounded-full border-2 border-white/5"></div>

        <div className="text-7xl font-extralight tracking-wider text-center">
          {formatTime(time)}
        </div>

        <Button
          onClick={toggleTimer}
          className={`absolute bottom-20 primary-gradient hover:shadow-2xl text-white rounded-2xl px-10 py-4 text-base font-bold shadow-xl transition-all duration-300 button-hover border-2 border-white/20 ${
            isActive ? "glow-effect" : ""
          }`}
        >
          {isActive ? "⏸ PAUSE" : "▶ START"}
        </Button>
      </div>

      {/* Session Counter */}
      <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg border border-white/30">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 animate-pulse"></div>
        <span className="text-sm text-slate-600 font-semibold">
          Session {currentSession} of {totalSessions}
        </span>
      </div>
    </div>
  );
};

export default Timer;
