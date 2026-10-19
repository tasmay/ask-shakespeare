import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex flex-col items-center pt-8 pb-4 px-4 text-center">
      {/* Decorative top pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-honey-400/15 border border-honey-500/30 text-honey-700 text-xs sm:text-sm font-sans font-medium tracking-wide shadow-sm">
        <span>👑</span>
        <span>The Culinary Globe Theatre</span>
        <span className="text-honey-400">•</span>
        <span className="text-plum-800">Generative Verse</span>
      </div>

      {/* Hero Avatar + Title combo */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-3">
        {/* Shakes.png Avatar with golden glow and culinary border */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-honey-500 to-plum-700 opacity-30 group-hover:opacity-60 blur-md transition duration-500 animate-pulse-glow" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-honey-500/50 bg-parchment-100 shadow-md flex items-center justify-center">
            <Image
              src="/shakes.png"
              width={140}
              height={140}
              alt="William Shakespeare"
              priority={true}
              className="object-cover scale-110 translate-y-1 hover:scale-115 transition duration-300"
            />
          </div>
          {/* Subtle floating utensil badge */}
          <div className="absolute -bottom-1 -right-1 bg-honey-500 text-white p-1.5 rounded-full shadow-md text-xs" title="Chef Shakespeare">
            🍳
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-plum-950">
            <Link href="/" className="hover:text-plum-800 transition">
              Ask <span className="bg-gradient-to-r from-honey-600 to-plum-800 bg-clip-text text-transparent">Shakespeare</span>
            </Link>
          </h1>
          <p className="text-xs sm:text-sm uppercase tracking-widest text-honey-700 font-sans font-semibold mt-1">
            Gourmet Recipes Transmuted Into Verse
          </p>
        </div>
      </div>

      {/* Punny hooky tagline */}
      <p className="max-w-xl text-base sm:text-lg text-plum-900/80 font-serif italic mt-2 leading-relaxed">
        &ldquo;If food be the music of love, cook on!&rdquo;
        <span className="block not-italic text-sm sm:text-base font-sans text-plum-900/70 mt-1">
          Ask Shakespeare for any recipe, and receive it in theatrical rhyme.
        </span>
      </p>
    </header>
  );
}