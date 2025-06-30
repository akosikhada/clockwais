"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useTimer } from "@/hooks";

interface TimerSettings {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

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
  timerSettings: TimerSettings;
  updateTimerSettings: (settings: TimerSettings) => void;
}

const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  focus: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 10 * 60, // 10 minutes
};

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
  const [timerSettings, setTimerSettings] = useState<TimerSettings>(
    DEFAULT_TIMER_SETTINGS
  );

  // Load timer settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem("timerSettings");
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setTimerSettings({
            focus: parsedSettings.focus || DEFAULT_TIMER_SETTINGS.focus,
            shortBreak:
              parsedSettings.shortBreak || DEFAULT_TIMER_SETTINGS.shortBreak,
            longBreak:
              parsedSettings.longBreak || DEFAULT_TIMER_SETTINGS.longBreak,
          });
        }
      } catch (error) {
        console.error("Error loading timer settings:", error);
      }
    };

    loadSettings();
  }, []);

  const getTimeForMode = (mode: "focus" | "shortBreak" | "longBreak") => {
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
    // Prevent mode change if we're already in focus mode and have started a timer
    if (mode === "focus" && newMode === "focus" && focusSessionStarted) {
      // Don't allow resetting an active focus session by clicking the focus button again
      return;
    }

    // Only allow switching to break modes if focus is completed
    // or if we're switching to focus mode
    if (newMode !== "focus" && !isFocusCompleted && focusSessionStarted) {
      // Prevent switching to break modes if focus timer is not completed
      return;
    }

    setMode(newMode);
    resetTimer(getTimeForMode(newMode));

    // Reset focus states when starting a new focus session
    // but only if we weren't already in focus mode
    if (newMode === "focus" && mode !== "focus") {
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

  const updateTimerSettings = (settings: TimerSettings) => {
    setTimerSettings(settings);

    // Update localStorage
    localStorage.setItem("timerSettings", JSON.stringify(settings));

    // If timer is not active, reset to new time for current mode
    if (!isActive) {
      resetTimer(settings[mode]);
    }
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
        timerSettings,
        updateTimerSettings,
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
