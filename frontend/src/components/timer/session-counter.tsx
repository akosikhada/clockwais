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
      className={`flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg border border-white/30 ${className}`}
    >
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 animate-pulse"></div>
      <span className="text-sm text-slate-600 font-semibold">
        Session {currentSession} of {totalSessions}
      </span>
    </div>
  );
};

export default SessionCounter;
