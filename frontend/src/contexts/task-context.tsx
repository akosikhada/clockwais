"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useTasks } from "@/hooks";
import { Task } from "@/types";

interface TaskContextProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
  addTask: (task: Omit<Task, "id">) => Task;
  removeTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, "id">>) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
  initialTasks?: Task[];
  onTaskComplete?: (taskId: string) => void;
}

export const TaskProvider = ({
  children,
  initialTasks = [],
  onTaskComplete,
}: TaskProviderProps) => {
  const taskMethods = useTasks({ initialTasks, onTaskComplete });

  return (
    <TaskContext.Provider value={taskMethods}>{children}</TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export default TaskContext;
