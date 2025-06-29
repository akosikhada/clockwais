"use client";

import React from "react";
import { useTimerContext } from "@/contexts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ModeSelectorProps {
  className?: string;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ className }) => {
  const { mode, setMode, focusSessionStarted, isFocusCompleted } =
    useTimerContext();

  // Check if break modes should be disabled
  const areBreakButtonsDisabled = focusSessionStarted && !isFocusCompleted;

  return (
    <div
      className={`flex items-center gap-1 mb-10 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/30 ${className}`}
    >
      <button
        onClick={() => setMode("focus")}
        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 button-hover ${
          mode === "focus"
            ? "bg-primary text-white shadow-lg glow-effect"
            : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
        }`}
      >
        Focus
      </button>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => !areBreakButtonsDisabled && setMode("shortBreak")}
              disabled={areBreakButtonsDisabled}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                areBreakButtonsDisabled
                  ? "text-slate-400 cursor-not-allowed opacity-60"
                  : mode === "shortBreak"
                    ? "bg-primary text-white shadow-lg glow-effect"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-50 button-hover"
              }`}
            >
              Short Break
            </button>
          </TooltipTrigger>
          {areBreakButtonsDisabled && (
            <TooltipContent>
              <p className="text-xs">Finish your focus session first</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => !areBreakButtonsDisabled && setMode("longBreak")}
              disabled={areBreakButtonsDisabled}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                areBreakButtonsDisabled
                  ? "text-slate-400 cursor-not-allowed opacity-60"
                  : mode === "longBreak"
                    ? "bg-primary text-white shadow-lg glow-effect"
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-50 button-hover"
              }`}
            >
              Long Break
            </button>
          </TooltipTrigger>
          {areBreakButtonsDisabled && (
            <TooltipContent>
              <p className="text-xs">Finish your focus session first</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ModeSelector;
