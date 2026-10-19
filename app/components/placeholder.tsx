export default function Placeholder() {
  return (
    <div className="w-full bg-parchment-100/60 border border-honey-500/20 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-honey-500/10 text-2xl mb-3">
        📖
      </div>
      <h3 className="text-xl font-serif font-bold text-plum-950 mb-2">
        How Dost This Culinary Sorcery Work?
      </h3>
      <p className="text-sm text-plum-900/70 font-sans max-w-lg mx-auto leading-relaxed">
        Search for any craving, ingredient, or delicacy above. Weaviate scans thousands of authentic recipes, and Google Gemini re-imagines the culinary instructions into an authentic Shakespearean verse!
      </p>

      <div className="mt-6 pt-6 border-t border-honey-500/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans text-plum-900/80">
        <div className="p-3 bg-white/60 rounded-xl border border-honey-500/10">
          <div className="text-base mb-1">🔍 1. Search</div>
          <span>Input any dish or click a sample query pill above</span>
        </div>
        <div className="p-3 bg-white/60 rounded-xl border border-honey-500/10">
          <div className="text-base mb-1">⚡ 2. Vector Search</div>
          <span>Weaviate retrieves the most delectable recipe match</span>
        </div>
        <div className="p-3 bg-white/60 rounded-xl border border-honey-500/10">
          <div className="text-base mb-1">🎭 3. Generative Verse</div>
          <span>Gemini transforms your recipe into a Shakespearean poem</span>
        </div>
      </div>
    </div>
  );
}