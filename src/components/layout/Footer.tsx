import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#E5E7EB] pt-14 pb-10 text-[#111111]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-[#E5E7EB]">
          
          {/* LEFT: Brand & Tagline (2 cols on md) */}
          <div className="col-span-2 space-y-3.5">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center shadow-sm">
                <span className="font-black text-white text-sm">N</span>
              </div>
              <span className="text-base font-black tracking-tight text-[#111111]">
                NEXA<span className="text-[#C79A3B]">.</span>FOOTBALL
              </span>
            </Link>

            <div className="text-xs font-bold text-[#111111] tracking-wide">
              Play. Compete. Belong.
            </div>

            <p className="text-xs text-[#5F6368] leading-relaxed max-w-sm">
              The official home of competitive eFootball. Connecting clubs, athletes, and fans across the national tournament circuit.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#F7F8FA] text-[#111111] border border-[#E5E7EB]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                Season 2025 Live Circuit
              </span>
            </div>
          </div>

          {/* COLUMN 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-[#5F6368]">
              <li>
                <Link href="/players" className="hover:text-[#111111] transition-colors">
                  Players
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="hover:text-[#111111] transition-colors">
                  Clubs
                </Link>
              </li>
              <li>
                <Link href="/tournaments" className="hover:text-[#111111] transition-colors">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link href="/matches" className="hover:text-[#111111] transition-colors">
                  Matches
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="hover:text-[#111111] transition-colors">
                  Rankings
                </Link>
              </li>
              <li>
                <Link href="/transfer-market" className="hover:text-[#111111] transition-colors">
                  Transfer Market
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 2: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[#5F6368]">
              <li>
                <Link href="/about" className="hover:text-[#111111] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[#111111] transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#111111] transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-[#111111] transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-[#111111] transition-colors">
                  Rules
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#111111] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Legal & Follow Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-xs text-[#5F6368]">
              <li>
                <Link href="/rules" className="hover:text-[#111111] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-[#111111] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-[#111111] transition-colors">
                  Competition Rules
                </Link>
              </li>
              <li>
                <Link href="/disciplinary" className="hover:text-[#111111] transition-colors">
                  Disciplinary Rules
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-[#111111] transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <h5 className="text-[11px] font-bold text-[#111111] uppercase tracking-wider mb-2">
                Follow Us
              </h5>
              <div className="flex flex-wrap gap-2 text-xs text-[#5F6368]">
                <a href="#" className="hover:text-[#111111] transition-colors">Facebook</a>
                <span>•</span>
                <a href="#" className="hover:text-[#111111] transition-colors">X</a>
                <span>•</span>
                <a href="#" className="hover:text-[#111111] transition-colors">YouTube</a>
                <span>•</span>
                <a href="#" className="hover:text-[#111111] transition-colors">Discord</a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM: Copyright & Slogan */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5F6368] gap-3">
          <div>
            © 2025 NEXA Football. All rights reserved.
          </div>
          <div className="font-semibold text-[#111111]">
            More Than A Game. A Community.
          </div>
        </div>
      </div>
    </footer>
  );
}

