"use client";

import React from "react";
import { TimerProvider } from "@/contexts";
import TimerCircle from "./timer-circle";
import ModeSelector from "./mode-selector";
import SessionCounter from "./session-counter";

interface TimerProps {
  onSessionComplete?: () => void;
  currentSession?: number;
  totalSessions?: number;
}

export const Timer: React.FC<TimerProps> = ({
  onSessionComplete,
  currentSession = 1,
  totalSessions = 8,
}) => {
  return (
    <TimerProvider
      onSessionComplete={onSessionComplete}
      initialSession={currentSession}
      maxSessions={totalSessions}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
        <ModeSelector />
        <TimerCircle />
        <SessionCounter />
      </div>
    </TimerProvider>
  );
};

export default Timer;
