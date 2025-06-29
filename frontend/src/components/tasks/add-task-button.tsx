"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Task } from "@/types";

interface AddTaskButtonProps {
  onAddTask: (task: Omit<Task, "id">) => void;
  className?: string;
}

export const AddTaskButton: React.FC<AddTaskButtonProps> = ({
  onAddTask,
  className,
}) => {
  return (
    <button
      onClick={() =>
        onAddTask({ title: "New Task", completed: false, points: 10 })
      }
      className={`primary-gradient text-white text-sm font-semibold transition-all duration-300 button-hover flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl border border-white/20 ${className}`}
    >
      <Plus className="h-4 w-4" />
      Add Task
    </button>
  );
};

export default AddTaskButton;
