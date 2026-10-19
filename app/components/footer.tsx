import Link from "next/link";

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="w-full mt-auto py-8 border-t border-honey-500/20 bg-parchment-100/50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-plum-900/60">
        <div className="flex items-center gap-2">
          <span>📜</span>
          <span className="font-serif italic text-plum-950 font-medium">Ask Shakespeare</span>
          <span>— Generative Culinary Verse powered by Weaviate &amp; Gemini</span>
        </div>

        <p className="text-center sm:text-right">
          Crafted with care by{" "}
          <Link
            href="https://tasmay.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-honey-700 hover:text-honey-600 font-semibold underline underline-offset-2 transition"
          >
            tasmay.dev
          </Link>
        </p>
      </div>
    </footer>
  );
}