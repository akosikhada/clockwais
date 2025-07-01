"use client";

import React from "react";
import { useTimerContext } from "@/contexts";

interface SessionCounterProps {
  className?: string;
}

export const SessionCounter: React.FC<SessionCounterProps> = ({
  className,
}) => {
  const { currentSession, totalSessions } = useTimerContext();

  return (
    <div
      className={`flex items-center gap-3 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg border border-white/30 dark:border-slate-700/50 ${className}`}
    >
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
      <span className="text-sm text-slate-600 dark:text-slate-300 font-semibold">
        Session {currentSession} of {totalSessions}
      </span>
    </div>
  );
};

export default SessionCounter;
