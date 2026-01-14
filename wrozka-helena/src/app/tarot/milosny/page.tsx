'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TarotCardDeck from '@/components/TarotCardDeck';
import { handlePayment, PACKAGE_TYPES } from '@/lib/stripe';

const TarotMilosny = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [showReading, setShowReading] = useState(false);

  const requiredCards = 5;
  const maxCards = 78; // Full tarot deck

  const handleCardSelect = (cardIndex: number) => {
    if (selectedCards.includes(cardIndex)) {
      setSelectedCards(selectedCards.filter(card => card !== cardIndex));
    } else if (selectedCards.length < requiredCards) {
      setSelectedCards([...selectedCards, cardIndex]);
    }
  };

  const handleRevealCards = () => {
    if (selectedCards.length === requiredCards) {
      setIsReading(true);
      // Simulate reading generation
      setTimeout(() => {
        setShowReading(true);
        setIsReading(false);
      }, 2000);
    }
  };

  const CardBack = ({ index, isSelected, onClick }: { index: number; isSelected: boolean; onClick: () => void }) => (
    <div
      className={`relative w-20 h-32 bg-gray-800 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer transition-all duration-300 ${
        isSelected ? 'border-solid border-black transform -translate-y-2 shadow-lg' : 'hover:border-gray-600'
      }`}
      onClick={onClick}
    >
      <div className="absolute inset-2 border border-gray-500 rounded">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const SpreadLayout = () => (
    <div className="flex flex-col items-center space-y-8">
      <h3 className="font-playfair text-xl text-gray-600 mb-4">
        WYBIERZ 5 KART
      </h3>

      {/* Cross formation */}
      <div className="relative">
        {/* Top card */}
        <div className="flex justify-center mb-4">
          <CardBack
            index={0}
            isSelected={selectedCards.includes(0)}
            onClick={() => handleCardSelect(0)}
          />
        </div>

        {/* Middle row - left, center, right */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <CardBack
            index={1}
            isSelected={selectedCards.includes(1)}
            onClick={() => handleCardSelect(1)}
          />
          <CardBack
            index={2}
            isSelected={selectedCards.includes(2)}
            onClick={() => handleCardSelect(2)}
          />
          <CardBack
            index={3}
            isSelected={selectedCards.includes(3)}
            onClick={() => handleCardSelect(3)}
          />
        </div>

        {/* Bottom card */}
        <div className="flex justify-center">
          <CardBack
            index={4}
            isSelected={selectedCards.includes(4)}
            onClick={() => handleCardSelect(4)}
          />
        </div>
      </div>

      {/* Deck */}
      <div className="mt-8">
        <div className="grid grid-cols-10 gap-2 max-w-4xl">
          {Array.from({ length: 50 }, (_, i) => (
            <CardBack
              key={i + 5}
              index={i + 5}
              isSelected={selectedCards.includes(i + 5)}
              onClick={() => handleCardSelect(i + 5)}
            />
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="w-full max-w-md bg-gray-200 rounded-full h-2 mt-8">
        <div
          className="bg-black h-2 rounded-full transition-all duration-300"
          style={{ width: `${(selectedCards.length / requiredCards) * 100}%` }}
        ></div>
      </div>

      {/* Reveal button */}
      <button
        className={`btn-primary mt-6 ${
          selectedCards.length === requiredCards
            ? 'opacity-100 cursor-pointer'
            : 'opacity-50 cursor-not-allowed'
        }`}
        onClick={handleRevealCards}
        disabled={selectedCards.length !== requiredCards || isReading}
      >
        {isReading ? 'Odkrywam karty...' : 'Odkryj karty'}
      </button>
    </div>
  );

  if (showReading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="section-padding bg-beige">
          <div className="container-max">
            <div className="text-center mb-8">
              <h1 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-4">
                Twój osobisty rozkład Tarota Miłosnego:
              </h1>
            </div>

            {/* Sample reading result */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-playfair text-xl font-bold mb-4">Interpretacja kart:</h3>
                  <div className="space-y-4 text-gray-600">
                    <p><strong>AS BUŁAW (Ty):</strong> Namiętność, energia i nowy początek w sferze uczuć.</p>
                    <p><strong>DZIEWIĘĆ MIECZY (Partner):</strong> Lęki, niepewność i koszmar w związku.</p>
                    <p><strong>CZTERY BUŁAW (Relacja):</strong> Stabilność, bezpieczeństwo i budowanie fundamentów związku.</p>
                    <p><strong>PAŹ MONET (Wyzwania):</strong> Nowe możliwości finansowe, nauka w sferze uczuć.</p>
                    <p><strong>CZTERY KIELICHÓW (Potencjał):</strong> Zastanów się, czego pragniesz od relacji.</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 italic mb-4">
                    Chcesz wiedzieć co ta karty oznaczają konkretnie dla Ciebie? Przeprowę pełną interpretację, która rozjaśni Twoją sytuację.
                  </p>
                  <form className="space-y-4">
                    <textarea
                      placeholder="Zadaj pytanie lub opisz, co Cię nurtuje..."
                      className="form-input h-32"
                      rows={6}
                    />
                    <button className="btn-primary w-full">
                      Odkryj pełne znaczenie kart (90zł) →
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="section-padding bg-white">
        <div className="container-max">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
              Tarot miłosny - rozkład partnerski
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Zrozum swoje emocje, poznaj intencje ukochanej osoby i odkryj, jakie kroki podjąć,
              by osiągnąć harmonię w związku lub przyciągnąć miłość swojego życia.
            </p>

            <div className="mt-8 mb-12">
              <button 
                className="bg-black text-white px-8 py-3 rounded text-sm font-medium"
                onClick={() => handlePayment(PACKAGE_TYPES['love-tarot'])}
              >
                Zamów rozkład miłosny
              </button>
              <p className="text-gray-500 text-sm mt-2">
                lub wylosuj karty poniżej:
              </p>
            </div>
          </div>

          {/* Card selection area */}
          <div className="bg-beige rounded-lg p-8 mb-12">
            <div className="text-center">
              <h2 className="font-playfair text-2xl text-gray-900 mb-6 italic">
                Weź głęboki oddech i skup się na swoim pytaniu
              </h2>

              <h3 className="text-gray-600 text-lg mb-8">
                WYBIERZ 5 KART
              </h3>

              {/* Cross formation for love spread */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  {/* Top card */}
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-28 bg-gray-800 border-2 border-dashed border-gray-400 rounded-lg"></div>
                  </div>

                  {/* Middle row */}
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="w-20 h-28 bg-gray-800 border-2 border-dashed border-gray-400 rounded-lg"></div>
                    <div className="w-20 h-28 bg-gray-800 border-2 border-dashed border-gray-400 rounded-lg"></div>
                    <div className="w-20 h-28 bg-gray-800 border-2 border-dashed border-gray-400 rounded-lg"></div>
                  </div>

                  {/* Bottom card */}
                  <div className="flex justify-center">
                    <div className="w-20 h-28 bg-gray-800 border-2 border-dashed border-gray-400 rounded-lg"></div>
                  </div>
                </div>
              </div>

              {/* Scrollable Deck */}
              <TarotCardDeck
                selectedCards={selectedCards}
                onCardSelect={handleCardSelect}
                requiredCards={requiredCards}
                onRevealCards={handleRevealCards}
                isReading={isReading}
              />
            </div>
          </div>

          {/* Info section */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">
                  Odkryj tajemnice serca i zbuduj szczęśliwy związek
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  Miłość... jedną z najpiękniejszych, a zarazem najbardziej skomplikowanych sfer życia,
                  jakie dane jest nam doświadczyć. To rozstanie ciągłe nadzieje i oczekiwanej marzenia.
                  To niezestarzenie emocje może Rozkład Miłosny to ukrytkowe narzędzie, które pomogą Ci zapiec
                  tajniki Twojego serca i relacji z bliską Ci osobą.
                </p>
              </div>
              <div>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  Rozkład ten ukazuje Twoją perspektywę uczuć, nastawienie i odczucia partnera, istotę waszego
                  związku, jakie najważsze słuby oraz błużowe wyzwania na jakie możecie natrafić. Dzięki temu
                  uzyskasz całościowy obgled na Twoją sytuację przeszkód, a też Twych uczinnów, które może
                  wzmocnić lub oisłabczyć waszą więź.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TarotMilosny;
