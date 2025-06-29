"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import { DailyData, WeeklyData } from "@/types";

interface AppContextProps {
  dailyData: DailyData;
  updateDailyData: (data: Partial<DailyData>) => void;
  weeklyData: WeeklyData;
  updateWeeklyData: (data: WeeklyData) => void;
  addPoints: (points: number) => void;
  increaseCompletedSessions: () => void;
  increaseFocusTime: (minutes: number) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  initialDailyData?: DailyData;
  initialWeeklyData?: WeeklyData;
}

export const AppProvider = ({
  children,
  initialDailyData = {
    focusTime: 0,
    completedSessions: 0,
    dailyStreak: 1,
    totalPoints: 0,
  },
  initialWeeklyData = [0, 0, 0, 0, 0, 0, 0],
}: AppProviderProps) => {
  const [dailyData, setDailyData] = useState<DailyData>(initialDailyData);
  const [weeklyData, setWeeklyData] = useState<WeeklyData>(initialWeeklyData);

  const updateDailyData = (updates: Partial<DailyData>) => {
    setDailyData((prev) => ({ ...prev, ...updates }));
  };

  const updateWeeklyData = (data: WeeklyData) => {
    setWeeklyData(data);
  };

  const addPoints = (points: number) => {
    setDailyData((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
    }));
  };

  const increaseCompletedSessions = () => {
    setDailyData((prev) => ({
      ...prev,
      completedSessions: prev.completedSessions + 1,
    }));

    // Update today's data in weekly chart
    const today = new Date().getDay();
    const todayIndex = today === 0 ? 6 : today - 1; // Convert Sunday (0) to index 6
    setWeeklyData((prev) => {
      const newData = [...prev];
      newData[todayIndex] = Math.min(newData[todayIndex] + 1, 8); // Cap at 8 sessions
      return newData;
    });
  };

  const increaseFocusTime = (minutes: number) => {
    setDailyData((prev) => ({
      ...prev,
      focusTime: prev.focusTime + minutes,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        dailyData,
        updateDailyData,
        weeklyData,
        updateWeeklyData,
        addPoints,
        increaseCompletedSessions,
        increaseFocusTime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default AppContext;
