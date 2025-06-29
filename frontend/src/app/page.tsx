"use client";

import { useState } from "react";
import { AppProvider } from "@/contexts";
import Timer from "@/components/timer/index";
import { DailyStats, ProgressChart } from "@/components/stats";
import TaskList from "@/components/tasks/index";
import {
  AppHeader,
  MotivationalQuote,
  QuickSettings,
  LevelProgress,
  CalendarView,
} from "@/components/layout";
import { Task, DailyData } from "@/types";

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete project proposal",
      completed: false,
      points: 25,
    },
    {
      id: "2",
      title: "Review team presentations",
      completed: false,
      points: 15,
    },
    { id: "3", title: "Update documentation", completed: false, points: 20 },
    { id: "4", title: "Team sync meeting", completed: false, points: 10 },
  ]);

  const [dailyData, setDailyData] = useState<DailyData>({
    focusTime: 205, // 3h 25m in minutes
    completedSessions: 4,
    dailyStreak: 5,
    totalPoints: 0,
  });

  const [currentSession, setCurrentSession] = useState(1);
  const [weeklyData, setWeeklyData] = useState([3, 5, 2, 6, 4, 3, 1]);

  // Format minutes to hours and minutes
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Handle session completion
  const handleSessionComplete = () => {
    setDailyData((prev) => ({
      ...prev,
      focusTime: prev.focusTime + 25, // Add 25 minutes for completed session
      completedSessions: prev.completedSessions + 1,
    }));
    setCurrentSession((prev) => prev + 1);

    // Update today's data in weekly chart
    const today = new Date().getDay();
    const todayIndex = today === 0 ? 6 : today - 1; // Convert Sunday (0) to index 6
    setWeeklyData((prev) => {
      const newData = [...prev];
      newData[todayIndex] = Math.min(newData[todayIndex] + 1, 8); // Cap at 8 sessions
      return newData;
    });
  };

  // Handle task completion
  const handleTaskComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    const task = tasks.find((t) => t.id === taskId);
    if (task && !task.completed) {
      setDailyData((prev) => ({
        ...prev,
        totalPoints: prev.totalPoints + task.points,
      }));
    }
  };

  // Handle adding new task
  const handleAddTask = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks((prev) => [...prev, task]);
  };

  return (
    <AppProvider initialDailyData={dailyData} initialWeeklyData={weeklyData}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-blue-50/30 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <AppHeader />

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Stats & Calendar */}
            <div className="lg:col-span-1 space-y-6">
              <DailyStats
                focusTime={formatTime(dailyData.focusTime)}
                completedSessions={dailyData.completedSessions}
                dailyStreak={dailyData.dailyStreak}
              />

              {/* Calendar */}
              <CalendarView />

              {/* Motivational Quote */}
              <MotivationalQuote
                quote="The only way to do great work is to love what you do."
                author="Steve Jobs"
              />
            </div>

            {/* Center Column - Timer */}
            <div className="lg:col-span-2 flex flex-col items-center">
              <Timer
                onSessionComplete={handleSessionComplete}
                currentSession={currentSession}
                totalSessions={8}
              />

              {/* Tasks Section */}
              <div className="w-full mt-8">
                <TaskList
                  tasks={tasks}
                  onTaskComplete={handleTaskComplete}
                  onAddTask={handleAddTask}
                />
              </div>
            </div>

            {/* Right Column - Progress & Settings */}
            <div className="lg:col-span-1 space-y-6">
              <ProgressChart weeklyData={weeklyData} />

              {/* Quick Settings */}
              <QuickSettings />

              {/* Level Progress */}
              <LevelProgress level={5} progress={75} />
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}
