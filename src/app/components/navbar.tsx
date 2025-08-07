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
        <li className="hover:text-yellow-400 cursor-pointer transition">Home</li>
        <li className="hover:text-yellow-400 cursor-pointer transition">About</li>
        <li className="hover:text-yellow-400 cursor-pointer transition">Gallery</li>
        <li className="hover:text-yellow-400 cursor-pointer transition">Travel</li>
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
          <span onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Home</span>
          <span onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">About</span>
          <span onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Gallery</span>
          <span onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Travel</span>
        </div>
      )}
    </nav>
  );
}
