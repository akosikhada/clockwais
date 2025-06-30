"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task } from "@/types";
import { Slider } from "@/components/ui/slider";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, "id">) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPoints, setTaskPoints] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!taskTitle.trim()) {
      return;
    }

    // Create new task
    onAddTask({
      title: taskTitle,
      completed: false,
      points: taskPoints,
    });

    // Reset form
    setTaskTitle("");
    setTaskPoints(10);

    // Close modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="taskTitle">Task Title</Label>
              <Input
                id="taskTitle"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="col-span-3"
                autoFocus
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="taskPoints">Points</Label>
                <span className="text-sm font-medium bg-primary text-white px-2 py-0.5 rounded-md">
                  +{taskPoints} pts
                </span>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <span className="text-sm text-muted-foreground">5</span>
                <Slider
                  id="taskPoints"
                  min={5}
                  max={30}
                  step={5}
                  value={[taskPoints]}
                  onValueChange={(value) => setTaskPoints(value[0])}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">30</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
