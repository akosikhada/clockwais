"use client";

import React, { useState, useEffect } from "react";
import { Quote } from "@/constant/quotes";

interface MotivationalQuoteProps {
  quotes: Quote[];
  className?: string;
}

export const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({
  quotes,
  className,
}) => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [fadeIn, setFadeIn] = useState(true);

  // Get a random quote
  const getRandomQuote = () => {
    if (!quotes.length) return null;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  // Set initial quote
  useEffect(() => {
    if (quotes.length) {
      setCurrentQuote(getRandomQuote());
    }
  }, [quotes]);

  useEffect(() => {
    // Rotate quotes every 30 seconds
    const intervalId = setInterval(() => {
      // Start fade out
      setFadeIn(false);

      // After fade out, change to random quote and fade in
      setTimeout(() => {
        // Get a new random quote that's different from the current one
        let newQuote = getRandomQuote();
        if (quotes.length > 1) {
          // Make sure we don't get the same quote twice in a row
          while (
            newQuote &&
            currentQuote &&
            newQuote.text === currentQuote.text
          ) {
            newQuote = getRandomQuote();
          }
        }

        setCurrentQuote(newQuote);
        setFadeIn(true);
      }, 500); // Half a second for fade out
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [quotes, currentQuote]);

  // If no quotes provided or no current quote, return null
  if (!quotes.length || !currentQuote) return null;

  return (
    <div
      className={`accent-gradient rounded-3xl p-6 text-slate-700 dark:text-white shadow-xl border border-white/30 dark:border-white/10 ${className}`}
    >
      <div className="text-3xl mb-4">💭</div>
      <div
        className={`transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-0"}`}
      >
        <p className="text-sm leading-relaxed mb-4 font-medium">
          &quot;{currentQuote.text}&quot;
        </p>
        <p className="text-xs opacity-70 font-semibold">
          - {currentQuote.author}
        </p>
      </div>
    </div>
  );
};

export default MotivationalQuote;
