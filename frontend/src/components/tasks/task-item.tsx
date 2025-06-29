"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-white/80 to-pink-50/50 border border-pink-100/50 group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="w-6 h-6 rounded-xl border-2 border-pink-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-400 data-[state=checked]:to-green-500 data-[state=checked]:border-green-400 transition-all duration-300"
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
              ? "line-through text-slate-400"
              : "text-slate-700 group-hover:text-slate-900"
          }`}
        >
          {task.title}
        </label>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs bg-gradient-to-r from-pink-100 to-blue-100 text-pink-600 font-bold px-3 py-1 rounded-full border border-pink-200">
          +{task.points} pts
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
