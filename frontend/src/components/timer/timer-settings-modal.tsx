"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTimerContext } from "@/contexts/timer-context";

interface TimerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TimerSettingsModal: React.FC<TimerSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { timerSettings, updateTimerSettings } = useTimerContext();

  const [focusMinutes, setFocusMinutes] = useState("");
  const [shortBreakMinutes, setShortBreakMinutes] = useState("");
  const [longBreakMinutes, setLongBreakMinutes] = useState("");

  // Load current settings when modal opens
  useEffect(() => {
    if (isOpen) {
      setFocusMinutes(String(Math.floor(timerSettings.focus / 60)));
      setShortBreakMinutes(String(Math.floor(timerSettings.shortBreak / 60)));
      setLongBreakMinutes(String(Math.floor(timerSettings.longBreak / 60)));
    }
  }, [isOpen, timerSettings]);

  const handleSave = () => {
    // Validate inputs
    const focus = Math.max(1, Math.min(60, parseInt(focusMinutes) || 25));
    const shortBreak = Math.max(
      1,
      Math.min(15, parseInt(shortBreakMinutes) || 5)
    );
    const longBreak = Math.max(
      5,
      Math.min(30, parseInt(longBreakMinutes) || 10)
    );

    // Update timer settings in context
    updateTimerSettings({
      focus: focus * 60,
      shortBreak: shortBreak * 60,
      longBreak: longBreak * 60,
    });

    // Close the modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Timer Settings
          </DialogTitle>
          <DialogDescription>
            Customize your timer durations to match your work style.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="focusTime" className="text-right">
              Focus
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="focusTime"
                type="number"
                min="1"
                max="60"
                value={focusMinutes}
                onChange={(e) => setFocusMinutes(e.target.value)}
                className="w-20"
              />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shortBreakTime" className="text-right">
              Short Break
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="shortBreakTime"
                type="number"
                min="1"
                max="15"
                value={shortBreakMinutes}
                onChange={(e) => setShortBreakMinutes(e.target.value)}
                className="w-20"
              />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="longBreakTime" className="text-right">
              Long Break
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="longBreakTime"
                type="number"
                min="5"
                max="30"
                value={longBreakMinutes}
                onChange={(e) => setLongBreakMinutes(e.target.value)}
                className="w-20"
              />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimerSettingsModal;
