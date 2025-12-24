'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'pl' ? 'en' : 'pl');
  };

  return (
    <header className="z-50 bg-white border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-12">
        <nav className="flex items-center justify-between h-24">
          {/* Logo - ALIGNED LEFT WITH PANEL BELOW */}
          <Link href="/" className="flex items-center">
            <img
              src="/images/icons/logo_pl.png"
              alt="Wróżka Helena"
              className="h-48 w-auto ml-0"
            />
          </Link>

          {/* Desktop Navigation - matching MagiaWrozb structure */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              href="/wrozby"
              className="text-gray-700 hover:text-gray-900 transition-colors font-lato uppercase text-sm tracking-wider font-medium"
            >
              {t.nav.readings}
            </Link>

            <div className="relative group">
              <button className="text-gray-700 hover:text-gray-900 transition-colors font-lato uppercase text-sm tracking-wider font-medium flex items-center">
                {t.nav.tarot}
                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown with enhanced styling */}
              <div className="absolute top-full left-0 mt-3 w-56 bg-white shadow-xl border border-gray-200 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2">
                <Link href="/tarot/milosny" className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                  {t.nav.tarotLove}
                </Link>
                <Link href="/tarot/3-karty" className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                  {t.nav.tarot3Cards}
                </Link>
                <Link href="/tarot/5-kart" className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                  {t.nav.tarot5Cards}
                </Link>
                <Link href="/tarot/krzyz-celtycki" className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                  {t.nav.celticCross}
                </Link>
                <Link href="/tarot/roczny" className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                  {t.nav.yearlyTarot}
                </Link>
              </div>
            </div>

            <Link
              href="/o-mnie"
              className="text-gray-700 hover:text-gray-900 transition-colors font-lato uppercase text-sm tracking-wider font-medium"
            >
              {t.nav.aboutMe}
            </Link>
            <Link
              href="/cennik"
              className="text-gray-700 hover:text-gray-900 transition-colors font-lato uppercase text-sm tracking-wider font-medium"
            >
              {t.nav.pricing}
            </Link>
            <Link
              href="/opinie"
              className="text-gray-700 hover:text-gray-900 transition-colors font-lato uppercase text-sm tracking-wider font-medium"
            >
              {t.nav.reviews}
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-gray-900 transition-colors font-lato uppercase text-sm tracking-wider font-medium"
            >
              {t.nav.blog}
            </Link>

            {/* Language Switcher - matching MagiaWrozb style */}
            <div className="flex items-center space-x-2 ml-6">
              <button
                onClick={() => setLanguage('pl')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  language === 'pl' 
                    ? 'bg-gray-800 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                PL
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  language === 'en' 
                    ? 'bg-gray-800 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-4">
              <Link href="/wrozby" className="text-gray-700 font-lato uppercase text-sm tracking-wider font-medium py-2">
                {t.nav.readings}
              </Link>
              <Link href="/tarot/milosny" className="text-gray-700 font-lato uppercase text-sm tracking-wider font-medium py-2 pl-4">
                {t.nav.tarotLove}
              </Link>
              <Link href="/tarot/3-karty" className="text-gray-700 font-lato uppercase text-sm tracking-wider font-medium py-2 pl-4">
                {t.nav.tarot3Cards}
              </Link>
              <Link href="/tarot/5-kart" className="text-gray-700 font-lato uppercase text-sm tracking-wider font-medium py-2 pl-4">
                {t.nav.tarot5Cards}
              </Link>
              <Link href="/tarot/krzyz-celtycki" className="text-gray-700 font-lato uppercase text-sm tracking-wider font-medium py-2 pl-4">
                {t.nav.celticCross}
              </Link>
              <Link href="/tarot/roczny" className="text-gray-700 font-lato uppercase text-sm tracking-wider font-medium py-2 pl-4">
                {t.nav.yearlyTarot}
              </Link>
              <Link href="/o-mnie" className="text-gray-700 font-lato uppercase text-sm tracking-wider font-medium py-2">
                {t.nav.aboutMe}
              </Link>
              <Link href="/cennik" className="text-gray-700 font-lato uppercase text-sm tracking-wider font-medium py-2">
                {t.nav.pricing}
              </Link>
              <Link href="/opinie" className="text-gray-700 font-lato uppercase text-sm tracking-wider font-medium py-2">
                {t.nav.reviews}
              </Link>
              <Link href="/blog" className="text-gray-700 font-lato uppercase text-sm tracking-wider font-medium py-2">
                {t.nav.blog}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setLanguage('pl')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    language === 'pl' 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  PL
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    language === 'en' 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
