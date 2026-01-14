'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { handlePayment, PACKAGE_TYPES } from '@/lib/stripe';

const KrzyzCeltycki = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const requiredCards = 10;

  const handleCardSelect = (cardIndex: number) => {
    if (selectedCards.includes(cardIndex)) {
      setSelectedCards(selectedCards.filter(card => card !== cardIndex));
    } else if (selectedCards.length < requiredCards) {
      setSelectedCards([...selectedCards, cardIndex]);
    }
  };

  const CardBack = ({ index, isSelected, onClick, label }: {
    index: number;
    isSelected: boolean;
    onClick: () => void;
    label?: string;
  }) => (
    <div className="text-center">
      <div
        className={`relative w-16 h-24 bg-gray-800 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer transition-all duration-300 ${
          isSelected ? 'border-solid border-black transform -translate-y-1 shadow-lg' : 'hover:border-gray-600'
        }`}
        onClick={onClick}
      >
        <div className="absolute inset-1 border border-gray-500 rounded">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-6 h-6 border border-gray-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      {label && <p className="text-xs text-gray-600 mt-1">{label}</p>}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="section-padding bg-white">
        <div className="container-max">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
              Krzyż Celtycki
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dogłębna analiza Twojej dość życiowej, wyzwań i potencjału. Odkryj wskazówki na przyszłość.
            </p>

            <div className="mt-8 mb-12">
              <button className="bg-black text-white px-8 py-3 rounded text-sm font-medium">
                Wylosuj karty
              </button>
              <p className="text-gray-500 text-sm mt-2">
                lub wybierz rozkład: Specjalne dla Ciebie!
              </p>
            </div>
          </div>

          {/* Celtic Cross Layout */}
          <div className="bg-beige rounded-lg p-8 mb-12">
            <div className="text-center">
              <h2 className="font-playfair text-2xl text-gray-900 mb-8">
                Mój magiczny warsztat
              </h2>

              <h3 className="text-gray-600 text-lg mb-8">
                WYBIERZ 10 KART
              </h3>

              {/* Celtic Cross formation */}
              <div className="flex justify-center items-center space-x-16 mb-8">
                {/* Left side - Cross */}
                <div className="relative">
                  {/* Vertical line */}
                  <div className="flex flex-col items-center space-y-4">
                    {/* Card 10 - Final Outcome */}
                    <CardBack
                      index={9}
                      isSelected={selectedCards.includes(9)}
                      onClick={() => handleCardSelect(9)}
                      label="Wynik"
                    />

                    {/* Card 9 - Hopes and Fears */}
                    <CardBack
                      index={8}
                      isSelected={selectedCards.includes(8)}
                      onClick={() => handleCardSelect(8)}
                      label="Nadzieje"
                    />

                    {/* Middle cross section */}
                    <div className="flex items-center space-x-4">
                      {/* Card 5 - Possible Future */}
                      <CardBack
                        index={4}
                        isSelected={selectedCards.includes(4)}
                        onClick={() => handleCardSelect(4)}
                        label="Przeszłość"
                      />

                      {/* Center cards - overlap */}
                      <div className="relative">
                        {/* Card 1 - Present Situation */}
                        <CardBack
                          index={0}
                          isSelected={selectedCards.includes(0)}
                          onClick={() => handleCardSelect(0)}
                          label="Sytuacja"
                        />
                        {/* Card 2 - Challenge (crosses over card 1) */}
                        <div className="absolute top-3 left-3 transform rotate-90">
                          <CardBack
                            index={1}
                            isSelected={selectedCards.includes(1)}
                            onClick={() => handleCardSelect(1)}
                          />
                        </div>
                      </div>

                      {/* Card 6 - Immediate Future */}
                      <CardBack
                        index={5}
                        isSelected={selectedCards.includes(5)}
                        onClick={() => handleCardSelect(5)}
                        label="Przyszłość"
                      />
                    </div>

                    {/* Card 8 - External Influences */}
                    <CardBack
                      index={7}
                      isSelected={selectedCards.includes(7)}
                      onClick={() => handleCardSelect(7)}
                      label="Wpływy"
                    />

                    {/* Card 7 - Self */}
                    <CardBack
                      index={6}
                      isSelected={selectedCards.includes(6)}
                      onClick={() => handleCardSelect(6)}
                      label="Ja"
                    />
                  </div>
                </div>

                {/* Right side - Staff */}
                <div className="flex flex-col space-y-6">
                  <CardBack
                    index={9 + 1}
                    isSelected={selectedCards.includes(9 + 1)}
                    onClick={() => handleCardSelect(9 + 1)}
                    label="Wynik końcowy"
                  />
                  <CardBack
                    index={9 + 2}
                    isSelected={selectedCards.includes(9 + 2)}
                    onClick={() => handleCardSelect(9 + 2)}
                    label="Wpływ zewnętrzny"
                  />
                  <CardBack
                    index={9 + 3}
                    isSelected={selectedCards.includes(9 + 3)}
                    onClick={() => handleCardSelect(9 + 3)}
                    label="Twoje podejście"
                  />
                  <CardBack
                    index={9 + 4}
                    isSelected={selectedCards.includes(9 + 4)}
                    onClick={() => handleCardSelect(9 + 4)}
                    label="Podstawa"
                  />
                </div>
              </div>

              {/* Deck */}
              <div className="grid grid-cols-10 gap-2 max-w-5xl mx-auto mb-8">
                {Array.from({ length: 50 }, (_, i) => (
                  <CardBack
                    key={i + 14}
                    index={i + 14}
                    isSelected={selectedCards.includes(i + 14)}
                    onClick={() => handleCardSelect(i + 14)}
                  />
                ))}
              </div>

              {/* Progress */}
              <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-black h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(selectedCards.length / requiredCards) * 100}%` }}
                ></div>
              </div>

              <button
                className={`btn-primary ${
                  selectedCards.length === requiredCards
                    ? 'opacity-100 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={selectedCards.length !== requiredCards}
              >
                Odkryj karty
              </button>
            </div>
          </div>

          {/* Info about Celtic Cross */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">
                  Czy zastanawiasz się...
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Jak mój partner postrzega naszą relację?
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Jaka jest przyszłość naszego związku?
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Co mogę zrobić, aby wznosić nasz związek?
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Co blokuje mnie przed znalezieniem prawdziwej miłości?
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Co blokuje mnie przed znalezieniem prawdziwej miłości?
                  </li>
                </ul>

                <p className="text-gray-600 text-sm mt-6">
                  Otwórz swoje serce na miłość i pozwól kartom poprowadzić Cię ku szczęściu.
                </p>

                <div className="mt-6">
                  <button className="bg-black text-white px-6 py-2 rounded text-sm">
                    Zadaj swoje pytanie
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded text-sm ml-4">
                    Zobacz przykładowy rozkład
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">
                  Dla kogo jest ten rozkład?
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Szukasz odpowiedzi na nurtujące Cię pytania dotyczące Twojego życia uczuciowego?
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Chcesz lepiej zrozumieć dynamikę Twojego obecnego związku?
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Stoisz przed ważnymi decyzjami maksymaln uczuciowe?
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Pragniesz dowinić się, co blokuje Cię przed znajdeien prawdziwej miłości?
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Chcesz wzmocnić swój związek i zbudować szczęśliwą przyszłość z ukochana osobą?
                  </li>
                </ul>

                <p className="text-gray-600 text-sm mt-6">
                  Niezależnie od tego, czy jesteś singlem, w związku, czy przechodzisz przez trudny czas,
                  Tarot Miłosny pomoże Ci odnaleźć jasność i spokoć na Twoiej ścieżce serca.
                </p>

                <button className="bg-black text-white px-6 py-2 rounded text-sm mt-6">
                  Rozpocznij swój Rozkład Miłosny
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KrzyzCeltycki;
