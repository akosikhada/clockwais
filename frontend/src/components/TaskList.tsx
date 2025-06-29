"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  points: number;
}

interface TaskListProps {
  tasks?: Task[];
  onTaskComplete?: (taskId: string) => void;
  onAddTask?: (task: Omit<Task, "id">) => void;
}

const TaskList = ({
  tasks = [
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
  ],
  onTaskComplete = () => {},
  onAddTask = () => {},
}: TaskListProps) => {
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  const handleTaskToggle = (taskId: string) => {
    setLocalTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
    onTaskComplete(taskId);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 card-hover">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl accent-gradient flex items-center justify-center">
            <span className="text-slate-700 text-sm font-bold">✓</span>
          </div>
          <h3 className="text-lg font-bold text-slate-700">Today's Tasks</h3>
        </div>
        <button
          onClick={() =>
            onAddTask({ title: "New Task", completed: false, points: 10 })
          }
          className="primary-gradient text-white text-sm font-semibold transition-all duration-300 button-hover flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl border border-white/20"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      <div className="space-y-3">
        {localTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-white/80 to-pink-50/50 border border-pink-100/50 group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleTaskToggle(task.id)}
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
        ))}
      </div>
    </div>
  );
};

export default TaskList;
