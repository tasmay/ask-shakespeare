import Link from "next/link";

export default function Footer() {
    return (
      <footer aria-labelledby="footer-heading" className="w-full h-10">
        <div className="flex flex-col w-full items-center py-3 bg-darkpurple text-white">
            <p className="text-xs text-center">created by <span className=""><Link href="https://tasmay.dev">tasmay.dev</Link></span></p>
        </div>
      </footer>
    );
}