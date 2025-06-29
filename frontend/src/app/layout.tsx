import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClockWais",
  description:
    "ClockWais is a gamified productivity enhancement tool designed to integrate seamlessly with existing project management systems. It boosts employee motivation, engagement, and focus through features like a Pomodoro timer, rewards system, leaderboards, and mini-games—all without disrupting core workflows. ClockWais uses game mechanics and external motivators to make work more interactive and enjoyable, helping to combat burnout, monotony, and low morale in creative teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={`${poppins.className} ${poppins.variable} font-sans`}>
        {children}
        <TempoInit />
      </body>
    </html>
  );
}
