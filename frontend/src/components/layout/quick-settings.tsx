"use client";

import React, { useState } from "react";

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  isEnabled: boolean;
  onToggle: () => void;
  bgColor: string;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  isEnabled,
  onToggle,
  bgColor,
}) => {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl ${bgColor} border border-${
        isEnabled ? "pink" : "blue"
      }-100`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-xl bg-gradient-to-r from-${
            isEnabled ? "pink" : "blue"
          }-400 to-${
            isEnabled ? "pink" : "blue"
          }-500 flex items-center justify-center`}
        >
          <span className="text-white text-sm">{icon}</span>
        </div>
        <span className="text-sm font-semibold text-slate-700">{label}</span>
      </div>
      <div
        onClick={onToggle}
        className={`w-14 h-7 ${
          isEnabled ? "primary-gradient" : "bg-slate-300"
        } rounded-full relative cursor-pointer button-hover shadow-lg`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full absolute top-0.5 ${
            isEnabled ? "right-0.5" : "left-0.5"
          } shadow-md transition-all duration-300`}
        ></div>
      </div>
    </div>
  );
};

interface QuickSettingsProps {
  className?: string;
}

export const QuickSettings: React.FC<QuickSettingsProps> = ({ className }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <div
      className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 card-hover ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-xl primary-gradient flex items-center justify-center">
          <span className="text-white text-sm font-bold">⚙️</span>
        </div>
        <h3 className="text-lg font-bold text-slate-700">Quick Settings</h3>
      </div>
      <div className="space-y-4">
        <SettingItem
          icon="🔊"
          label="Sound"
          isEnabled={soundEnabled}
          onToggle={() => setSoundEnabled(!soundEnabled)}
          bgColor="bg-gradient-to-r from-pink-50 to-blue-50"
        />

        <SettingItem
          icon="🔔"
          label="Notifications"
          isEnabled={notificationsEnabled}
          onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
          bgColor="bg-gradient-to-r from-blue-50 to-pink-50"
        />

        <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-sm">⚙️</span>
            </div>
            <span className="text-sm font-semibold text-slate-700">
              Timer Settings
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300 button-hover border border-pink-200">
            <span className="text-sm text-pink-600">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSettings;
