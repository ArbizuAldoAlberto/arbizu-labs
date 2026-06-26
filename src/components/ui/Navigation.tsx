'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[var(--color-space-black)]/80 backdrop-blur-xl border-b border-[var(--color-space-border)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl text-white font-bold">
          Arbizu<span className="text-[#1D9E75]">Labs</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/cases" className="font-space text-xs uppercase tracking-widest text-[#C2C0B6] hover:text-white transition-colors">
            Casos de Estudio
          </Link>
          <Link href="/#developer-kits" className="font-space text-xs uppercase tracking-widest text-[#C2C0B6] hover:text-white transition-colors">
            Boilerplates
          </Link>
          <Link href="/pricing" className="font-space text-xs uppercase tracking-widest text-[#C2C0B6] hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/booking" className="btn-primary-enterprise">
            Agendar Call
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
