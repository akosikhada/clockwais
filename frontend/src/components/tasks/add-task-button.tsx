"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Task } from "@/types";
import AddTaskModal from "./add-task-modal";

interface AddTaskButtonProps {
  onAddTask: (task: Omit<Task, "id">) => void;
  className?: string;
}

export const AddTaskButton: React.FC<AddTaskButtonProps> = ({
  onAddTask,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        data-add-task-button="true"
        className={`bg-pink-600 text-white text-sm font-semibold transition-all duration-300 button-hover flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl border border-white/20 ${className}`}
      >
        <Plus className="h-4 w-4" />
        Add Task
      </button>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={onAddTask}
      />
    </>
  );
};

export default AddTaskButton;
