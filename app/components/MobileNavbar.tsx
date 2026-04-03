'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:text-[#f5c518] transition-colors"
        aria-label="Toggle Navigation"
      >
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#0a0a0a]/80 z-[999] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-[250px] bg-[#0a0a0a] border-l border-white/10 z-[1000] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl flex flex-col p-6`}
      >
        <div className="flex justify-end mb-8">
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-white/50 hover:text-white transition-colors"
            aria-label="Close Navigation"
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-white hover:text-[#f5c518] transition-colors tracking-wide"
          >
            Movies
          </Link>
          <Link
            href="#"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-white/70 hover:text-[#f5c518] transition-colors tracking-wide"
          >
            Trending
          </Link>
          <Link
            href="#"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-white/70 hover:text-[#f5c518] transition-colors tracking-wide"
          >
            Watchlist
          </Link>
        </nav>

        <div className="mt-auto pb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 bg-[#f5c518] rounded-md">
              <Clapperboard color="#0a0a0a" size={20} className="stroke-[2.5]" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Cine<span className="text-[#f5c518]">X</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
