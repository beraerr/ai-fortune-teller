'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CrossSpreadLayout from '@/components/CrossSpreadLayout';
import { getCardsByIds, type TarotCard } from '@/lib/tarotDeck';
import { createUserProfile, getAstrologicalContext, zodiacData, type UserProfile } from '@/lib/seedData';

const Tarot5Kart = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [revealedCards, setRevealedCards] = useState<TarotCard[]>([]);
  const [aiReading, setAiReading] = useState<string>('');
  const [isLoadingFullReading, setIsLoadingFullReading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);

  // User form data
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    birthDate: '',
    question: ''
  });

  const requiredCards = 5;
  const positions = ['Sytuacja', 'Przeszkoda', 'Świadomość', 'Nieświadomość', 'Rada'];

  const handleCardSelect = (cardIndex: number) => {
    if (selectedCards.includes(cardIndex)) {
      setSelectedCards(selectedCards.filter(card => card !== cardIndex));
    } else if (selectedCards.length < requiredCards) {
      setSelectedCards([...selectedCards, cardIndex]);
    }
  };

  const handleRevealCards = async () => {
    if (selectedCards.length === requiredCards) {
      setIsReading(true);
      const cards = getCardsByIds(selectedCards);
      setRevealedCards(cards);
      
      setTimeout(() => {
        setShowReading(true);
        setShowUserForm(true);
        setIsReading(false);
      }, 1500);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGetFullReading = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.birthDate) {
      alert('Proszę podać imię i datę urodzenia');
      return;
    }

    // Create user profile with zodiac data
    const profile = createUserProfile(
      formData.name,
      formData.surname,
      formData.email,
      formData.birthDate
    );
    setUserProfile(profile);
    setIsLoadingFullReading(true);

    try {
      const response = await fetch('/api/ai-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          birthdate: formData.birthDate,
          question: formData.question || 'Proszę o ogólną interpretację wylosowanych kart w kontekście mojego życia.',
          cardIds: selectedCards,
          language: 'PL',
          astrologicalContext: getAstrologicalContext(profile),
          spreadType: '5-card-cross',
          positions: positions
        }),
      });

      const data = await response.json();
      
      if (data.answer) {
        setAiReading(data.answer);
        setShowUserForm(false);
      } else {
        setAiReading('Przepraszam, nie udało się wygenerować wróżby. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Error getting reading:', error);
      setAiReading('Wystąpił błąd podczas generowania wróżby. Spróbuj ponownie.');
    } finally {
      setIsLoadingFullReading(false);
    }
  };

  const handleReset = () => {
    setSelectedCards([]);
    setShowReading(false);
    setRevealedCards([]);
    setAiReading('');
    setFormData({ name: '', surname: '', email: '', birthDate: '', question: '' });
    setUserProfile(null);
    setShowUserForm(false);
  };

  if (showReading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-4">
                Oto Twój rozkład 5 kart
              </h1>
              <button 
                onClick={handleReset}
                className="text-gray-600 underline hover:text-gray-800 transition-colors text-sm"
              >
                CHCESZ WYLOSOWAĆ INNE KARTY? KLIKNIJ TUTAJ
              </button>
            </div>

            {/* Revealed Cards in Cross Layout */}
            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <div className="flex flex-col items-center gap-4">
                {/* Top card */}
                <div className="text-center">
                  <p className="text-xs text-slate-500 mb-2">{positions[0]}</p>
                  <div className="w-20 h-28 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg flex items-center justify-center shadow-lg border border-purple-500/30">
                    <span className="text-purple-300 text-2xl">✦</span>
                  </div>
                  {revealedCards[0] && (
                    <p className="text-xs text-slate-700 mt-2 font-medium">{revealedCards[0].namePL}</p>
                  )}
                </div>

                {/* Middle row */}
                <div className="flex items-center gap-6">
                  {/* Left */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-2">{positions[1]}</p>
                    <div className="w-20 h-28 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg flex items-center justify-center shadow-lg border border-purple-500/30">
                      <span className="text-purple-300 text-2xl">✦</span>
                    </div>
                    {revealedCards[1] && (
                      <p className="text-xs text-slate-700 mt-2 font-medium">{revealedCards[1].namePL}</p>
                    )}
                  </div>

                  {/* Center (horizontal) */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-2">{positions[2]}</p>
                    <div className="w-28 h-20 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg flex items-center justify-center shadow-lg border border-purple-500/30">
                      <span className="text-purple-300 text-2xl">✦</span>
                    </div>
                    {revealedCards[2] && (
                      <p className="text-xs text-slate-700 mt-2 font-medium">{revealedCards[2].namePL}</p>
                    )}
                  </div>

                  {/* Right */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-2">{positions[3]}</p>
                    <div className="w-20 h-28 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg flex items-center justify-center shadow-lg border border-purple-500/30">
                      <span className="text-purple-300 text-2xl">✦</span>
                    </div>
                    {revealedCards[3] && (
                      <p className="text-xs text-slate-700 mt-2 font-medium">{revealedCards[3].namePL}</p>
                    )}
                  </div>
                </div>

                {/* Bottom card */}
                <div className="text-center">
                  <p className="text-xs text-slate-500 mb-2">{positions[4]}</p>
                  <div className="w-20 h-28 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg flex items-center justify-center shadow-lg border border-purple-500/30">
                    <span className="text-purple-300 text-2xl">✦</span>
                  </div>
                  {revealedCards[4] && (
                    <p className="text-xs text-slate-700 mt-2 font-medium">{revealedCards[4].namePL}</p>
                  )}
                </div>
              </div>
            </div>

            {/* User Profile Info */}
            {userProfile && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8 border border-indigo-100">
                <h3 className="font-playfair text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <span>🌟</span> Twój profil astrologiczny
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-slate-500 mb-1">Znak zodiaku</p>
                    <p className="font-semibold text-slate-800">{userProfile.zodiacSign}</p>
                    <p className="text-xs text-slate-400">{zodiacData[userProfile.zodiacSign].dateRange}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-slate-500 mb-1">Żywioł</p>
                    <p className="font-semibold text-slate-800">{userProfile.element}</p>
                    <p className="text-xs text-slate-400">Planeta: {userProfile.rulingPlanet}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-slate-500 mb-1">Liczba życia</p>
                    <p className="font-semibold text-slate-800">{userProfile.numerologyNumber}</p>
                    <p className="text-xs text-slate-400">Numerologia</p>
                  </div>
                </div>
              </div>
            )}

            {/* AI Reading Result */}
            {aiReading && (
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 mb-8 border border-purple-200">
                <h3 className="font-playfair text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <span>✨</span> Twoja osobista interpretacja
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {aiReading}
                </div>
              </div>
            )}

            {/* User Form */}
            {showUserForm && !aiReading && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="font-playfair text-xl text-gray-900 mb-2 text-center">
                  Otrzymaj spersonalizowaną interpretację
                </h3>
                <p className="text-gray-600 text-center mb-6 text-sm">
                  Podaj swoje dane, aby Wróżka Helena mogła uwzględnić Twój znak zodiaku, 
                  numerologię i wpływ planet w interpretacji kart.
                </p>

                <form onSubmit={handleGetFullReading} className="max-w-lg mx-auto space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Imię *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Nazwisko</label>
                      <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Data urodzenia *</label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Potrzebna do określenia Twojego znaku zodiaku i liczby numerologicznej
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Twoje pytanie (opcjonalne)</label>
                    <textarea
                      name="question"
                      value={formData.question}
                      onChange={handleFormChange}
                      rows={4}
                      placeholder="Opisz swoją sytuację lub zadaj pytanie..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoadingFullReading}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingFullReading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        <span>Wróżka Helena analizuje Twój horoskop...</span>
                      </>
                    ) : (
                      <>
                        <span>✨</span>
                        <span>Odkryj pełne znaczenie kart</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* New Reading Button */}
            {aiReading && (
              <div className="text-center">
                <button 
                  onClick={handleReset}
                  className="bg-gray-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Wylosuj nowe karty
                </button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-4 italic">
              Rozkład Tarota z 5 kart
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Rozkład krzyża — pięć kart ukazujących sytuację, przeszkody, 
              świadomość, podświadomość i radę na przyszłość.
            </p>
            <button className="bg-black text-white px-6 py-2 rounded text-sm mb-2">
              Zamów rozkład
            </button>
            <p className="text-gray-500 text-sm">lub wylosuj karty poniżej</p>
          </div>

          {/* Cross Spread Layout */}
          <CrossSpreadLayout
            selectedCards={selectedCards}
            onCardSelect={handleCardSelect}
            onRevealCards={handleRevealCards}
            isReading={isReading}
            maxCards={requiredCards}
          />

          {/* Info Section */}
          <div className="mt-16 grid md:grid-cols-2 gap-12">
            <div>
              <span className="text-sm text-gray-500 italic">Tarot — Rozkład 5 Kart</span>
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mt-2 mb-4">
                Poznaj pełny obraz sytuacji
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Rozkład 5 kart to głębsza analiza Twojej sytuacji. Każda pozycja 
                ma swoje znaczenie i razem tworzą kompleksowy obraz tego, 
                co dzieje się w Twoim życiu.
              </p>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">1.</span>
                  <span><strong>Sytuacja</strong> — obecny stan rzeczy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">2.</span>
                  <span><strong>Przeszkoda</strong> — co stoi na drodze</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">3.</span>
                  <span><strong>Świadomość</strong> — co wiesz o sytuacji</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">4.</span>
                  <span><strong>Nieświadomość</strong> — ukryte wpływy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">5.</span>
                  <span><strong>Rada</strong> — zalecane działanie</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-8">
                <p className="text-gray-600 text-center italic">
                  "Pięć kart to pięć drzwi do zrozumienia. 
                  Za każdymi kryje się część prawdy o Twojej ścieżce."
                </p>
                <p className="text-gray-500 text-sm text-center mt-4">— Wróżka Helena</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tarot5Kart;
