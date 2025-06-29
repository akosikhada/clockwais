"use client";

import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  iconColorClass?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  iconColorClass = "text-primary",
  className,
}) => {
  return (
    <div className={`flex items-center gap-4 py-2 ${className}`}>
      <div className={`text-2xl ${iconColorClass}`}>{icon}</div>
      <div className="flex-grow">
        <div className="text-sm font-medium text-slate-500">{title}</div>
        <div className="text-xl font-bold text-slate-800">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
