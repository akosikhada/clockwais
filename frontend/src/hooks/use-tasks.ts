"use client";

import { useState } from "react";
import { Task } from "@/types";

interface UseTasksOptions {
  initialTasks?: Task[];
  onTaskComplete?: (taskId: string) => void;
}

export const useTasks = ({
  initialTasks = [],
  onTaskComplete,
}: UseTasksOptions = {}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    // If the task is being marked as complete, call the onTaskComplete callback
    const task = tasks.find((t) => t.id === taskId);
    if (task && !task.completed && onTaskComplete) {
      onTaskComplete(taskId);
    }
  };

  const addTask = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks((prev) => [...prev, task]);
    return task;
  };

  const removeTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const updateTask = (taskId: string, updates: Partial<Omit<Task, "id">>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };

  return {
    tasks,
    toggleTask,
    addTask,
    removeTask,
    updateTask,
  };
};

export default useTasks;
