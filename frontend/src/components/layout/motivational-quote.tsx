"use client";

import React from "react";

interface MotivationalQuoteProps {
  quote: string;
  author: string;
  className?: string;
}

export const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({
  quote,
  author,
  className,
}) => {
  return (
    <div
      className={`accent-gradient rounded-3xl p-6 text-slate-700 shadow-xl border border-white/30 card-hover ${className}`}
    >
      <div className="text-3xl mb-4">💭</div>
      <p className="text-sm leading-relaxed mb-4 font-medium">
        &quot;{quote}&quot;
      </p>
      <p className="text-xs opacity-70 font-semibold">- {author}</p>
    </div>
  );
};

export default MotivationalQuote;
