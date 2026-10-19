'use client';
import { useState, useRef } from 'react';
import RecipeCard from './recipe-card';
import ErrorBanner from './error';
import Spinner from './spinner';
import Placeholder from './placeholder';

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string;
  poem: string;
}

const SAMPLE_QUERIES = [
  { label: 'Chicken & cheese', icon: '🍗', query: 'chicken and cheese recipes' },
  { label: 'Warm apple pie', icon: '🥧', query: 'warm apple pie' },
  { label: 'Deviled crab', icon: '🦀', query: 'deviled crab' },
  { label: 'Garlic cheese bread', icon: '🧀', query: 'cheesy garlic bread' },
  { label: 'Creamy pasta', icon: '🍝', query: 'creamy pasta' },
  { label: 'Lemon herb salmon', icon: '🍋', query: 'lemon herb salmon' },
];

export default function ContentContainer() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [inputVal, setInputVal] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const executeSearch = async (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    setRecipe(null);
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(trimmed)}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok) {
        setRecipe(data.recipe);
      } else {
        throw new Error(data.error || 'Failed to retrieve recipe from the Bard.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went awry in the Globe Theatre.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeSearch(inputVal);
  };

  const handleChipClick = (query: string) => {
    setInputVal(query);
    if (inputRef.current) {
      inputRef.current.value = query;
    }
    executeSearch(query);
  };

  const handleReset = () => {
    setRecipe(null);
    setErrorMessage(null);
    setInputVal('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto items-center pb-16 px-2 sm:px-4">
      {/* Centered Modern Search Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
        <label htmlFor="recipe-search" className="sr-only">
          Search for a recipe
        </label>
        <div className="relative group">
          {/* Subtle glow border on hover/focus */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-honey-500 via-plum-700 to-honey-600 rounded-2xl blur-sm opacity-25 group-hover:opacity-50 group-focus-within:opacity-75 transition duration-300" />

          <div className="relative flex items-center bg-white rounded-2xl shadow-warm border border-honey-500/25 p-2 sm:p-2.5">
            {/* Search Icon */}
            <div className="pl-3 pr-2 text-honey-600 flex items-center pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Input Field */}
            <input
              ref={inputRef}
              type="text"
              id="recipe-search"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="What feast wouldst thou desire to cook? e.g. lemon chicken..."
              className="w-full py-2.5 px-2 text-plum-950 placeholder-plum-900/40 bg-transparent text-sm sm:text-base font-sans outline-none focus:ring-0"
              required
            />

            {/* Clear button if text exists */}
            {inputVal && (
              <button
                type="button"
                onClick={() => setInputVal('')}
                className="px-2 text-plum-900/40 hover:text-plum-900 text-sm transition"
                title="Clear input"
              >
                ✕
              </button>
            )}

            {/* Submit Search Button */}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-plum-900 to-plum-950 hover:from-plum-800 hover:to-plum-900 text-parchment-100 font-sans font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow-md hover:shadow-lg transition duration-200 disabled:opacity-50 whitespace-nowrap"
            >
              <span>✨</span>
              <span>Search</span>
            </button>
          </div>
        </div>
      </form>

      {/* Sample Query Chips Underneath */}
      <div className="w-full max-w-2xl mt-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xs uppercase tracking-wider text-honey-700 font-semibold font-sans">
            Too lazy to type? Tap a feast:
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {SAMPLE_QUERIES.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleChipClick(item.query)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-parchment-100 hover:bg-honey-500/15 text-plum-950 border border-honey-500/25 text-xs font-sans font-medium shadow-xs hover:border-honey-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Results / Interactive Area */}
      <div className="w-full mt-8">
        {errorMessage && <ErrorBanner message={errorMessage} />}

        {loading && <Spinner />}

        {!loading && recipe && (
          <RecipeCard recipe={recipe} onReset={handleReset} />
        )}

        {!loading && !recipe && !errorMessage && (
          <Placeholder />
        )}
      </div>
    </div>
  );
}