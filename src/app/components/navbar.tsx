'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-lg bg-black/30 text-white"
    >
      {/* Logo */}
      <div className="text-2xl font-bold tracking-widest">Sigiriya</div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-8 text-lg font-medium">
        <li>
          <a href="#about" className="hover:text-yellow-400 cursor-pointer transition">Home</a>
        </li>
        <li>
          <a href="#history" className="hover:text-yellow-400 cursor-pointer transition">About</a>
        </li>
        <li>
          <a href="#painting" className="hover:text-yellow-400 cursor-pointer transition">Gallery</a>
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <div
        className="md:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="w-6 h-1 bg-white mb-1" />
        <div className="w-6 h-1 bg-white mb-1" />
        <div className="w-6 h-1 bg-white" />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/90 text-white flex flex-col items-center gap-6 py-6 md:hidden z-50">
          <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Home</a>
          <a href="#history" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">About</a>
          <a href="#painting" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Gallery</a>
        </div>
      )}
    </nav>
  );
}
