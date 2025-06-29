"use client";

import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  bgColor?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  bgColor = "primary-gradient",
  className,
}) => {
  return (
    <div className={`flex items-center justify-between p-3 ${className}`}>
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center text-white`}
        >
          {icon}
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500">{title}</div>
          <div className="text-lg font-bold text-slate-700">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
