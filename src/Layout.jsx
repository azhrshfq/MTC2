import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";

const navLinks = [
  { label: "Home", page: "Home" },
  { label: "Plans & Benefits", page: "Plans" },
  { label: "Register", page: "Register" },
  { label: "My Account", page: "Dashboard" },
  { label: "About & FAQ", page: "About" },
];

export default function Layout({ children, currentPageName }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top bar */}
      <div className="bg-[#0f4a33] text-white text-sm py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span className="text-green-200 text-xs">Masjid Ar-Raudhah Community Welfare Programme</span>
          <div className="flex items-center gap-4 text-xs text-green-200">
            <a href="tel:+6561234567" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3 h-3" /> 6123 4567
            </a>
            <a href="mailto:skimpintar@ar-raudhah.sg" className="flex items-center gap-1 hover:text-white transition-colors">
              <Mail className="w-3 h-3" /> skimpintar@ar-raudhah.sg
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a6b4a] to-[#0f4a33] flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">SP</span>
            </div>
            <div>
              <div className="font-bold text-[#1a6b4a] text-base leading-tight">Skim Pintar</div>
              <div className="text-[10px] text-gray-400 leading-tight">by Masjid Ar-Raudhah</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPageName === link.page
                    ? "bg-[#1a6b4a] text-white"
                    : "text-gray-600 hover:bg-green-50 hover:text-[#1a6b4a]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium my-1 transition-all ${
                  currentPageName === link.page
                    ? "bg-[#1a6b4a] text-white"
                    : "text-gray-700 hover:bg-green-50 hover:text-[#1a6b4a]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0f4a33] text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SP</span>
                </div>
                <div>
                  <div className="font-bold text-white">Skim Pintar</div>
                  <div className="text-xs text-green-300">by Masjid Ar-Raudhah</div>
                </div>
              </div>
              <p className="text-green-200 text-sm leading-relaxed">
                A community-driven safety net providing affordable long-term financial security and funeral services coverage for Muslim families in Singapore.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-green-100">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.page}>
                    <Link to={createPageUrl(link.page)} className="text-green-300 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-green-100">Contact Us</h4>
              <ul className="space-y-2 text-sm text-green-300">
                <li>📍 Masjid Ar-Raudhah, Singapore</li>
                <li>📞 <a href="tel:+6561234567" className="hover:text-white">6123 4567</a></li>
                <li>✉️ <a href="mailto:skimpintar@ar-raudhah.sg" className="hover:text-white">skimpintar@ar-raudhah.sg</a></li>
                <li className="pt-2 text-green-400 text-xs">Mon–Fri: 9am–5pm | Sat: 9am–1pm</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-green-400">
            <span>© {new Date().getFullYear()} Masjid Ar-Raudhah. All rights reserved.</span>
            <span className="font-arabic text-sm text-green-300">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
          </div>
        </div>
      </footer>
    </div>
  );
}