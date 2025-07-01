// Task-related types
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  points: number;
  priority?: "low" | "medium" | "high";
}

// Timer-related types
export interface TimerConfig {
  focusTime: number; // in seconds
  shortBreakTime: number; // in seconds
  longBreakTime: number; // in seconds
  sessionsPerCycle: number;
}

// Stats-related types
export interface DailyData {
  focusTime: number; // in minutes
  completedSessions: number;
  dailyStreak: number;
  totalPoints: number;
}

export type WeeklyData = number[];
