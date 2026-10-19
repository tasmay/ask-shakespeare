'use client';
import { useState } from "react";

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string;
  poem: string;
}

export default function RecipeCard({ 
  recipe, 
  onReset 
}: { 
  recipe: Recipe;
  onReset?: () => void;
}) {
  const [viewMode, setViewMode] = useState<'poem' | 'recipe'>('poem');
  const [copied, setCopied] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  const handleCopyPoem = async () => {
    try {
      await navigator.clipboard.writeText(`${recipe.title}\n\n${recipe.poem}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full bg-parchment-50 border border-honey-500/30 rounded-3xl shadow-warm overflow-hidden transition-all duration-300">
      {/* Top Banner with Title & Badges */}
      <div className="bg-gradient-to-r from-plum-950 via-plum-900 to-plum-950 text-parchment-50 px-6 py-6 border-b border-honey-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-honey-500/20 text-honey-400 text-xs font-sans font-medium mb-2 border border-honey-500/30">
              <span>🎭</span>
              <span>Shakespearean Feast</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-parchment-100 tracking-tight">
              {recipe.title}
            </h2>
          </div>

          {onReset && (
            <button
              onClick={onReset}
              className="self-start sm:self-center text-xs font-sans text-parchment-300 hover:text-white px-3 py-1.5 rounded-lg border border-parchment-300/20 hover:border-parchment-300/40 transition flex items-center gap-1.5"
            >
              <span>←</span>
              <span>New Search</span>
            </button>
          )}
        </div>

        {/* View Mode Segmented Pill Switch */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex p-1 rounded-xl bg-plum-950/60 border border-honey-500/30 shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode('poem')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-sans font-semibold transition-all duration-200 ${
                viewMode === 'poem'
                  ? 'bg-gradient-to-r from-honey-500 to-honey-600 text-plum-950 shadow-md font-bold'
                  : 'text-parchment-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>📜</span>
              <span>The Bard&apos;s Verse</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('recipe')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-sans font-semibold transition-all duration-200 ${
                viewMode === 'recipe'
                  ? 'bg-gradient-to-r from-honey-500 to-honey-600 text-plum-950 shadow-md font-bold'
                  : 'text-parchment-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🍳</span>
              <span>Original Recipe</span>
            </button>
          </div>

          {/* Copy Button (Active in poem mode) */}
          {viewMode === 'poem' && (
            <button
              type="button"
              onClick={handleCopyPoem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-parchment-200 hover:text-white text-xs font-sans font-medium transition border border-white/10"
              title="Copy verse to clipboard"
            >
              <span>{copied ? '✓' : '📋'}</span>
              <span>{copied ? 'Verse Copied!' : 'Copy Verse'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-6 sm:p-8">
        {viewMode === 'poem' ? (
          /* The Bard's Verse Mode */
          <div className="relative bg-parchment-100/70 border border-honey-500/20 rounded-2xl p-6 sm:p-8 shadow-sm">
            {/* Decorative quotation background symbol */}
            <div className="absolute top-4 right-6 text-6xl font-serif text-honey-500/15 select-none pointer-events-none">
              &ldquo;
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-4 text-xs font-sans uppercase tracking-wider text-honey-700 font-semibold">
                <span>✦</span>
                <span>The Recipe Rendered in Theatrical Verse</span>
                <span>✦</span>
              </div>

              <div className="prose prose-plum max-w-none">
                <p className="font-serif text-base sm:text-lg text-plum-950 leading-relaxed whitespace-pre-line text-left sm:text-center italic">
                  {recipe.poem}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-honey-500/20 flex flex-wrap items-center justify-between text-xs text-plum-900/60 font-sans">
                <span className="flex items-center gap-1">
                  <span>🍽️</span> Based on authentic instructions for <strong>{recipe.title}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setViewMode('recipe')}
                  className="text-honey-700 hover:text-honey-600 font-semibold underline mt-2 sm:mt-0"
                >
                  View ingredient measurements &amp; steps →
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Original Culinary Recipe Mode */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Ingredients Column with interactive checkboxes */}
            <div className="md:col-span-5 bg-parchment-100/60 border border-honey-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-honey-500/20">
                <h3 className="text-lg font-serif font-bold text-plum-950 flex items-center gap-2">
                  <span>🥗</span>
                  <span>Ingredients</span>
                </h3>
                <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-honey-500/15 text-honey-700 font-medium">
                  {recipe.ingredients.length} items
                </span>
              </div>

              <p className="text-xs text-plum-900/60 font-sans mb-3 italic">
                Tap items to check them off as you prep:
              </p>

              <ul className="space-y-2.5">
                {recipe.ingredients.map((ing, idx) => {
                  const isChecked = !!checkedIngredients[idx];
                  return (
                    <li
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition text-sm ${
                        isChecked
                          ? 'bg-herb-500/10 text-plum-900/40 line-through'
                          : 'hover:bg-white/60 text-plum-900'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by li onClick
                        className="mt-0.5 rounded text-honey-600 focus:ring-honey-500 border-honey-400"
                      />
                      <span className="leading-snug">{ing}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Step-by-Step Cooking Instructions Column */}
            <div className="md:col-span-7 flex flex-col justify-start">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-honey-500/20">
                <h3 className="text-lg font-serif font-bold text-plum-950 flex items-center gap-2">
                  <span>🍳</span>
                  <span>Directions</span>
                </h3>
                <span className="text-xs font-sans text-plum-900/60">
                  Cook&apos;s Edition
                </span>
              </div>

              <div className="bg-white/70 border border-honey-500/15 rounded-2xl p-6 shadow-sm">
                <p className="text-sm sm:text-base text-plum-900 leading-relaxed whitespace-pre-line font-sans">
                  {recipe.instructions}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setViewMode('poem')}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-semibold text-honey-700 hover:text-honey-600 transition"
                >
                  <span>📜</span>
                  <span>Return to Shakespeare&apos;s verse →</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}