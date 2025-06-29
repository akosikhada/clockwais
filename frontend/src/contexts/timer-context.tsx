"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import { useTimer } from "@/hooks";

interface TimerContextProps {
  time: number;
  isActive: boolean;
  formattedTime: string;
  toggleTimer: () => void;
  resetTimer: (newTime?: number) => void;
  mode: "focus" | "shortBreak" | "longBreak";
  setMode: (mode: "focus" | "shortBreak" | "longBreak") => void;
  currentSession: number;
  totalSessions: number;
  incrementSession: () => void;
  focusSessionStarted: boolean;
  isFocusCompleted: boolean;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

interface TimerProviderProps {
  children: ReactNode;
  initialMode?: "focus" | "shortBreak" | "longBreak";
  onSessionComplete?: () => void;
  initialSession?: number;
  maxSessions?: number;
}

export const TimerProvider = ({
  children,
  initialMode = "focus",
  onSessionComplete,
  initialSession = 1,
  maxSessions = 8,
}: TimerProviderProps) => {
  const [mode, setMode] = useState<"focus" | "shortBreak" | "longBreak">(
    initialMode
  );
  const [currentSession, setCurrentSession] = useState(initialSession);
  const [totalSessions] = useState(maxSessions);
  const [focusSessionStarted, setFocusSessionStarted] = useState(false);
  const [isFocusCompleted, setIsFocusCompleted] = useState(false);

  const getTimeForMode = (mode: "focus" | "shortBreak" | "longBreak") => {
    switch (mode) {
      case "focus":
        return 25 * 60; // 25 minutes
      case "shortBreak":
        return 5 * 60; // 5 minutes
      case "longBreak":
        return 10 * 60; // 10 minutes
      default:
        return 25 * 60;
    }
  };

  const handleComplete = () => {
    if (mode === "focus") {
      // Mark focus session as completed
      setFocusSessionStarted(true);
      setIsFocusCompleted(true);

      setCurrentSession((prev) => {
        const next = prev + 1;
        if (onSessionComplete) onSessionComplete();

        // Switch to appropriate break type based on session number
        const isLongBreak = next % 4 === 0; // Long break every 4 sessions
        setMode(isLongBreak ? "longBreak" : "shortBreak");

        return next <= maxSessions ? next : 1;
      });
    } else if (mode === "shortBreak" || mode === "longBreak") {
      // When breaks complete, don't auto-start next session
      // This is handled by the break option buttons
    }
  };

  const {
    time,
    isActive,
    toggleTimer: originalToggleTimer,
    resetTimer,
    formattedTime,
  } = useTimer({
    initialTime: getTimeForMode(mode),
    onComplete: handleComplete,
  });

  // Enhanced toggleTimer that tracks focus session status
  const toggleTimer = () => {
    if (mode === "focus") {
      // If we're starting a focus session, mark it as started
      if (!isActive) {
        setFocusSessionStarted(true);
        setIsFocusCompleted(false);
      }
    }
    originalToggleTimer();
  };

  const handleModeChange = (newMode: "focus" | "shortBreak" | "longBreak") => {
    // Only allow switching to break modes if focus is completed
    // or if we're switching to focus mode
    if (newMode !== "focus" && !isFocusCompleted && focusSessionStarted) {
      // Prevent switching to break modes if focus timer is not completed
      return;
    }

    setMode(newMode);
    resetTimer(getTimeForMode(newMode));

    // Reset focus states when starting a new focus session
    if (newMode === "focus") {
      setFocusSessionStarted(false);
      setIsFocusCompleted(false);
    }

    // Don't auto-start break timers
    if (newMode === "shortBreak" || newMode === "longBreak") {
      // Break timers require user action to start
    }
  };

  const incrementSession = () => {
    setCurrentSession((prev) => {
      const next = prev + 1;
      return next <= maxSessions ? next : 1;
    });
  };

  return (
    <TimerContext.Provider
      value={{
        time,
        isActive,
        formattedTime,
        toggleTimer,
        resetTimer,
        mode,
        setMode: handleModeChange,
        currentSession,
        totalSessions,
        incrementSession,
        focusSessionStarted,
        isFocusCompleted,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
};

export default TimerContext;
