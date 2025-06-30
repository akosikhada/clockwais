"use client";

import React from "react";
import { TimerProvider } from "@/contexts";
import TimerCircle from "./timer-circle";
import ModeSelector from "./mode-selector";
import SessionCounter from "./session-counter";
import TimerSettingsModal from "./timer-settings-modal";

interface TimerSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TimerProps {
  onSessionComplete?: () => void;
  currentSession?: number;
  totalSessions?: number;
  timerSettingsProps?: TimerSettingsProps;
}

export const Timer: React.FC<TimerProps> = ({
  onSessionComplete,
  currentSession = 1,
  totalSessions = 8,
  timerSettingsProps,
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
        
        {/* Timer Settings Modal - Inside TimerProvider context */}
        {timerSettingsProps && (
          <TimerSettingsModal
            isOpen={timerSettingsProps.isOpen}
            onClose={timerSettingsProps.onClose}
          />
        )}
      </div>
    </TimerProvider>
  );
};

export default Timer;
