"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useTimerContext } from "@/contexts";

interface TimerCircleProps {
  className?: string;
}

export const TimerCircle: React.FC<TimerCircleProps> = ({ className }) => {
  const { formattedTime, isActive, toggleTimer, mode, setMode } =
    useTimerContext();
  const isBreakMode = mode === "shortBreak" || mode === "longBreak";

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-96 h-96 rounded-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white mb-8 shadow-2xl border-8 border-white/20 ${className}`}
    >
      {/* Progress Ring */}
      <div className="absolute inset-4 rounded-full border-4 border-white/10"></div>
      <div className="absolute inset-8 rounded-full border-2 border-white/5"></div>

      {/* Centered Timer - Positioned slightly higher */}
      <div className="text-8xl font-light tracking-widest text-center absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {formattedTime}
      </div>

      {/* Control Buttons */}
      {isBreakMode ? (
        <div className="absolute bottom-20 flex flex-col gap-2 items-center">
          <div className="flex gap-2">
            <Button
              onClick={() => {
                // Only start the timer if it's not already active
                if (!isActive) {
                  toggleTimer();
                }
              }}
              className="bg-gradient-to-r from-green-400 to-green-500 hover:shadow-2xl text-white rounded-lg px-5 py-1 text-sm font-medium shadow-xl transition-all duration-300 button-hover border border-white/20"
            >
              Rest
            </Button>
            <Button
              onClick={() => {
                /* No functionality yet */
              }}
              className="bg-gradient-to-r from-blue-400 to-blue-500 hover:shadow-2xl text-white rounded-lg px-5 py-1 text-sm font-medium shadow-xl transition-all duration-300 button-hover border border-white/20"
            >
              Play Game
            </Button>
          </div>
          <Button
            onClick={() => setMode("focus")}
            className="bg-gradient-to-r from-pink-400 to-pink-500 hover:shadow-2xl text-white rounded-lg px-5 py-1 text-sm font-medium shadow-xl transition-all duration-300 button-hover border border-white/20 mt-2"
          >
            Skip Break
          </Button>
        </div>
      ) : (
        <Button
          onClick={toggleTimer}
          className={`absolute bottom-24 primary-gradient hover:shadow-2xl text-white rounded-xl px-10 py-2 text-sm font-medium shadow-lg transition-all duration-300 button-hover border border-white/10 ${
            isActive ? "glow-effect" : ""
          }`}
        >
          {isActive ? "⏸ PAUSE" : "▶ START"}
        </Button>
      )}
    </div>
  );
};

export default TimerCircle;
