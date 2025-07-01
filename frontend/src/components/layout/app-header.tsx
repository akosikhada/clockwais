"use client";

import React from "react";
import { format } from "date-fns";
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface AppHeaderProps {
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ className }) => {
  const currentDate = format(new Date(), "EEEE, MMMM d");
  const currentTime = format(new Date(), "h:mm a");

  const handleLogout = () => {
    // Handle logout functionality here
    console.log("Logging out...");
    // You would typically clear auth tokens, redirect to login page, etc.
    alert("Logout functionality will be implemented here");
  };

  return (
    <div
      className={`relative flex items-center justify-between mb-10 ${className}`}
    >
      {/* Left side: Logo and Title */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/logo/clockwais-logo.webp"
            alt="ClockWais Logo"
            width={48}
            height={48}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            ClockWais
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Making work enjoyable, one timer at a time
          </p>
        </div>
      </div>

      {/* Center: Date and Time (Absolutely Centered) */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center">
        <div className="text-slate-600 dark:text-slate-300 text-sm font-semibold">
          {currentDate}
        </div>
        <div className="text-slate-500 dark:text-slate-400 text-xs">
          {currentTime}
        </div>
      </div>

      {/* Right side: Profile Icon with Dropdown */}
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Avatar className="h-12 w-12 rounded-2xl hover:shadow-lg transition-all duration-300 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-md">
                <AvatarImage src="" />
                <AvatarFallback className="rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500">
                  <User className="w-5 h-5 text-white" />
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl"
          >
            <DropdownMenuItem className="cursor-default font-medium text-slate-800 dark:text-slate-200">
              <User className="mr-2 h-4 w-4" />
              <span>User Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300 focus:bg-red-50 dark:focus:bg-red-900/30 focus:text-red-700 dark:focus:text-red-300"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AppHeader;
