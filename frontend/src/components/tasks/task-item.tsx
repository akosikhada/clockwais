"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
}

const getPriorityStyles = (priority: string | undefined) => {
  switch (priority) {
    case "low":
      return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-900";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-900";
    case "high":
      return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-900";
    default:
      return "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600";
  }
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  const priorityStyles = getPriorityStyles(task.priority);

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="w-6 h-6 rounded-xl border-2 border-pink-300 dark:border-pink-700 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-400 transition-all duration-300"
          />
          {task.completed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
          )}
        </div>
        <label
          htmlFor={`task-${task.id}`}
          className={`text-sm cursor-pointer transition-all duration-300 font-medium ${
            task.completed
              ? "line-through text-slate-400 dark:text-slate-500"
              : "text-slate-700 dark:text-slate-300"
          }`}
        >
          {task.title}
        </label>
      </div>
      <div className="flex items-center gap-2">
        {task.priority && (
          <span
            className={`text-xs ${priorityStyles} font-medium px-3 py-1 rounded-full border`}
          >
            {task.priority}
          </span>
        )}
        <span className="text-xs bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400 font-bold px-3 py-1 rounded-full border border-pink-300 dark:border-pink-900/50">
          +{task.points} pts
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
