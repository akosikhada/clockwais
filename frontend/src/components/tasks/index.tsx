"use client";

import React from "react";
import { TaskProvider } from "@/contexts";
import TaskItem from "./task-item";
import AddTaskButton from "./add-task-button";
import { Task } from "@/types";
import { Plus, ListTodo } from "lucide-react";

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
  const isEmpty = tasks.length === 0;

  return (
    <TaskProvider initialTasks={tasks} onTaskComplete={onTaskComplete}>
      <div
        className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 dark:border-slate-700/30 ${className}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
              <span className="text-slate-700 dark:text-white text-sm font-bold">
                ✓
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">
              Today's Tasks
            </h3>
          </div>
          {onAddTask && <AddTaskButton onAddTask={onAddTask} />}
        </div>

        <div className="space-y-3">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-3">
                <ListTodo className="w-6 h-6 text-slate-400 dark:text-slate-300" />
              </div>
              <h4 className="text-slate-600 dark:text-slate-300 font-medium mb-1">
                No tasks yet
              </h4>
              <p className="text-slate-400 dark:text-slate-500 text-sm max-w-xs mb-4">
                Add your first task to start tracking your productivity
              </p>
              {onAddTask && (
                <button
                  onClick={() =>
                    document
                      .querySelector<HTMLButtonElement>(
                        '[data-add-task-button="true"]'
                      )
                      ?.click()
                  }
                  className="text-sm font-medium text-primary dark:text-pink-400 flex items-center gap-1 hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add your first task
                </button>
              )}
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onTaskComplete ? onTaskComplete : () => {}}
              />
            ))
          )}
        </div>
      </div>
    </TaskProvider>
  );
};

export default TaskList;
