'use client';
import { useState, useEffect } from "react";

const QUOTES = [
  "Stirring the cauldron of verse...",
  "Dipping quill into melted butter...",
  "Measuring herbs in iambic pentameter...",
  "Summoning the culinary muse...",
  "Composing a feast fit for a king...",
];

export default function Spinner() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div role="status" className="flex flex-col items-center justify-center p-8 bg-parchment-100/80 border border-honey-500/20 rounded-2xl shadow-warm backdrop-blur-sm max-w-md mx-auto text-center animate-fade-in">
      {/* Animated icon container */}
      <div className="relative w-16 h-16 flex items-center justify-center mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-honey-400/20 border-t-honey-500 animate-spin" />
        <span className="text-2xl animate-bounce">📜</span>
      </div>

      <p className="text-plum-950 font-serif font-medium text-lg mb-1">
        The Bard is Penning Your Dish...
      </p>
      <p className="text-honey-700 font-sans text-xs sm:text-sm italic transition-all duration-300">
        &ldquo;{QUOTES[quoteIndex]}&rdquo;
      </p>
      <span className="sr-only">Loading recipe...</span>
    </div>
  );
}