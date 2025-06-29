"use client";

import React from "react";
import { TaskProvider } from "@/contexts";
import TaskItem from "./task-item";
import AddTaskButton from "./add-task-button";
import { Task } from "@/types";

interface TaskListProps {
  tasks?: Task[];
  onTaskComplete?: (taskId: string) => void;
  onAddTask?: (task: Omit<Task, "id">) => void;
  className?: string;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks = [],
  onTaskComplete,
  onAddTask,
  className,
}) => {
  return (
    <TaskProvider initialTasks={tasks} onTaskComplete={onTaskComplete}>
      <div
        className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 ${className}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
              <span className="text-slate-700 text-sm font-bold">✓</span>
            </div>
            <h3 className="text-lg font-bold text-slate-700">Today's Tasks</h3>
          </div>
          {onAddTask && <AddTaskButton onAddTask={onAddTask} />}
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onTaskComplete ? onTaskComplete : () => {}}
            />
          ))}
        </div>
      </div>
    </TaskProvider>
  );
};

export default TaskList;
