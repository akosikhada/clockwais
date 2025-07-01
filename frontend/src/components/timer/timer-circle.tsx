"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTimerContext } from "@/contexts";
import GameModal from "./game-modal";

interface TimerCircleProps {
  className?: string;
}

export const TimerCircle: React.FC<TimerCircleProps> = ({ className }) => {
  const {
    formattedTime,
    isActive,
    toggleTimer,
    mode,
    setMode,
    time,
    timerSettings,
  } = useTimerContext();
  const isBreakMode = mode === "shortBreak" || mode === "longBreak";
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [progress, setProgress] = useState(100);

  // Calculate the total time based on current mode
  const getTotalTime = () => {
    switch (mode) {
      case "focus":
        return timerSettings.focus;
      case "shortBreak":
        return timerSettings.shortBreak;
      case "longBreak":
        return timerSettings.longBreak;
      default:
        return timerSettings.focus;
    }
  };

  // Update progress when time changes
  useEffect(() => {
    const totalTime = getTotalTime();
    const progressPercentage = (time / totalTime) * 100;
    setProgress(progressPercentage);
  }, [time, mode, timerSettings]);

  // Get color based on mode
  const getProgressColor = () => {
    switch (mode) {
      case "focus":
        return "stroke-pink-600";
      case "shortBreak":
        return "stroke-green-500";
      case "longBreak":
        return "stroke-blue-500";
      default:
        return "stroke-pink-600";
    }
  };

  // SVG circle calculations
  const radius = 160;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      <div
        className={`relative flex flex-col items-center justify-center w-96 h-96 rounded-full bg-slate-800 text-white mb-8 shadow-2xl border-8 border-white/20 ${isActive ? "animate-beat" : ""} ${className}`}
      >
        {/* Progress Ring SVG */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          width="100%"
          height="100%"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          {/* Background circle */}
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            strokeWidth={strokeWidth}
            stroke="rgba(255,255,255,0.1)"
            className="transition-all duration-300"
          />
          {/* Progress circle */}
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            stroke="currentColor"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            className={`${getProgressColor()} transition-all duration-300`}
            style={{
              transition: "stroke-dashoffset 1s linear",
            }}
          />
        </svg>

        {/* Interior design rings for visual depth */}
        <div className="absolute inset-4 rounded-full border-4 border-white/10"></div>
        <div className="absolute inset-8 rounded-full border-2 border-white/5"></div>

        {/* Centered Timer - Positioned slightly higher */}
        <div className="text-8xl font-light tracking-widest text-center absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10">
          {formattedTime}
        </div>

        {/* Control Buttons */}
        {isBreakMode ? (
          <div className="absolute bottom-20 flex flex-col gap-2 items-center z-10">
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  // Only start the timer if it's not already active
                  if (!isActive) {
                    toggleTimer();
                  }
                }}
                className="bg-green-500 hover:bg-green-600 hover:shadow-2xl text-white rounded-lg px-5 py-1 text-sm font-medium shadow-xl transition-all duration-300 button-hover border border-white/20"
              >
                Rest
              </Button>
              <Button
                onClick={() => setIsGameModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 hover:shadow-2xl text-white rounded-lg px-5 py-1 text-sm font-medium shadow-xl transition-all duration-300 button-hover border border-white/20"
              >
                Play Game
              </Button>
            </div>
            <Button
              onClick={() => setMode("focus")}
              className="bg-pink-600 hover:bg-pink-700 hover:shadow-2xl text-white rounded-lg px-5 py-1 text-sm font-medium shadow-xl transition-all duration-300 button-hover border border-white/20 mt-2"
            >
              Skip Break
            </Button>
          </div>
        ) : (
          <Button
            onClick={toggleTimer}
            className={`absolute bottom-24 bg-pink-600 hover:bg-pink-700 hover:shadow-2xl text-white rounded-xl px-10 py-2 text-sm font-medium shadow-lg transition-all duration-300 button-hover border border-white/10 z-10 ${
              isActive ? "glow-effect" : ""
            }`}
          >
            {isActive ? "⏸ PAUSE" : "▶ START"}
          </Button>
        )}
      </div>

      {/* Game Modal */}
      <GameModal
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
      />
    </>
  );
};

export default TimerCircle;
