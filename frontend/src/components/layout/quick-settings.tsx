"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Settings } from "lucide-react";

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  isEnabled: boolean;
  onToggle: () => void;
  iconBgColor: string;
  rowBgColor: string;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  isEnabled,
  onToggle,
  iconBgColor,
  rowBgColor,
}) => {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl ${rowBgColor} border border-pink-100/50 dark:border-slate-700/30`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-xl ${iconBgColor} flex items-center justify-center`}
        >
          <span className="text-white text-sm">{icon}</span>
        </div>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </span>
      </div>
      <div
        onClick={onToggle}
        className={`w-14 h-7 ${
          isEnabled ? "bg-pink-500" : "bg-slate-300 dark:bg-slate-600"
        } rounded-full relative cursor-pointer button-hover shadow-lg`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full absolute top-0.5 ${
            isEnabled ? "right-0.5" : "left-0.5"
          } shadow-md transition-all duration-300 flex items-center justify-center`}
        >
          {/* Optional: Add icon inside the toggle button */}
        </div>
      </div>
    </div>
  );
};

interface QuickSettingsProps {
  className?: string;
  onOpenTimerSettings: () => void;
}

export const QuickSettings: React.FC<QuickSettingsProps> = ({
  className,
  onOpenTimerSettings,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid rendering with undefined theme
  }

  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div
      className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 dark:border-slate-700/30 ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-xl bg-pink-500 flex items-center justify-center">
          <span className="text-white text-sm font-bold">⚙️</span>
        </div>
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">
          Quick Settings
        </h3>
      </div>
      <div className="space-y-4">
        <SettingItem
          icon="🔊"
          label="Sound"
          isEnabled={soundEnabled}
          onToggle={() => setSoundEnabled(!soundEnabled)}
          iconBgColor={
            soundEnabled ? "bg-pink-500" : "bg-slate-400 dark:bg-slate-600"
          }
          rowBgColor={
            soundEnabled
              ? "bg-pink-100 dark:bg-pink-900/20"
              : "bg-slate-100 dark:bg-slate-700/20"
          }
        />

        {/* Theme Switch */}
        <div
          className={`flex items-center justify-between p-3 rounded-xl ${
            isDarkMode
              ? "bg-indigo-100 dark:bg-indigo-900/20"
              : "bg-amber-100 dark:bg-amber-900/20"
          } border border-pink-100/50 dark:border-slate-700/30`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-xl ${
                isDarkMode ? "bg-indigo-600" : "bg-amber-500"
              } flex items-center justify-center`}
            >
              {isDarkMode ? (
                <Moon size={16} className="text-white" />
              ) : (
                <Sun size={16} className="text-white" />
              )}
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </span>
          </div>
          <div
            onClick={toggleTheme}
            className={`w-14 h-7 ${
              isDarkMode ? "bg-pink-500" : "bg-slate-300 dark:bg-slate-600"
            } rounded-full relative cursor-pointer button-hover shadow-lg`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full absolute top-0.5 ${
                isDarkMode ? "right-0.5" : "left-0.5"
              } shadow-md transition-all duration-300 flex items-center justify-center`}
            >
              {isDarkMode ? (
                <Moon size={12} className="text-indigo-600" />
              ) : (
                <Sun size={12} className="text-amber-500" />
              )}
            </div>
          </div>
        </div>

        <div
          onClick={onOpenTimerSettings}
          className="flex items-center justify-between p-3 rounded-xl bg-pink-100 dark:bg-pink-900/20 border border-pink-100/50 dark:border-slate-700/30 cursor-pointer hover:bg-pink-200 dark:hover:bg-pink-900/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-pink-500 flex items-center justify-center">
              <Settings size={16} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Timer Settings
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-pink-500 shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300 button-hover">
            <span className="text-sm text-white font-bold">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSettings;
