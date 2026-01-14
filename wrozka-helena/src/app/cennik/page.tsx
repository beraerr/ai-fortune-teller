'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { handlePayment, PACKAGE_TYPES } from '@/lib/stripe';

const Cennik = () => {
  const basicPackages = [
    {
      title: "1 pytanie",
      price: "14zł",
      description: "Idealny do zadania krótkiego pytania i uzyskania szybkiej odpowiedzi.",
      time: "Odpowiedź w 15 minut",
      features: []
    },
    {
      title: "3 pytania",
      price: "29zł",
      description: "Potrzebujesz na szczegółowe analizy Twojej sytuacji i odpowiedzi na nurtujące Cię pytania.",
      time: "Odpowiedź w 25 minut",
      features: []
    },
    {
      title: "5 pytań",
      price: "39zł",
      description: "Idealny dla kompleksowej analizy różnych aspektów Twojego życia.",
      time: "Odpowiedź w 30 minut",
      features: []
    }
  ];

  const tarotPackages = [
    {
      title: "3 Karty",
      price: "50zł",
      description: "Uzyskaj szybkiej i trafne odpowiedzi na nurtujące Cię pytania.",
      time: "Odpowiedź do 30m",
      icon: "III"
    },
    {
      title: "5 Kart",
      price: "80zł",
      description: "Zrozum kontekst swojej sytuacji, odkryj ukryte możliwości i podejmij lepsze decyzje.",
      time: "Odpowiedź do 1h",
      icon: "V"
    },
    {
      title: "Miłosny",
      price: "90zł",
      description: "Rozkład miłosny dla dwuuosobny, poznaj swoje prawdziwe serce i zbuduj szczęśliwy związek.",
      time: "Odpowiedź do 2h",
      icon: "♡"
    },
    {
      title: "Krzyż Celtycki",
      price: "200zł",
      description: "Dogłębna analiza Twojej sytuacji życiowej, wyzwań i potencjału. Odkryj wskazówki na przyszłość.",
      time: "Odpowiedź do 12h",
      icon: "✚"
    }
  ];

  const extendedPackages = [
    {
      title: "Roczny",
      price: "240zł",
      description: "Poznaj energię nadchodzących 12 miesięcy. Wykorzystaj najlepsze okresy i sprzyjającego momentum na ważne decyzje. Zaplanning swój rok z wyprzedzeniem.",
      time: "Odpowiedź do 1 doby",
      icon: "XII"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="section-padding bg-white">
        <div className="container-max">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
              Cennik
            </h1>
            <p className="text-gray-600 text-lg">
              Pytania do Wróżby
            </p>
          </div>

          {/* Basic Packages */}
          <div className="mb-16">
            <h2 className="font-playfair text-2xl text-gray-900 text-center mb-12">
              Wybierz swoją wróżbę
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Poznaj odpowiedzi na nurtujące Cię pytania. Wybierz swój pakiet, napisz pytania w formularzu i dokonaj opłaty, a ja wyślę Ci odpowiedzi na maila.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {basicPackages.map((pkg, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
                  <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-2">
                    {pkg.title}
                  </h3>
                  <div className="font-playfair text-4xl font-bold text-gray-900 mb-2">
                    {pkg.price}
                  </div>
                  <p className="text-gray-600 text-sm mb-6">
                    {pkg.description}
                  </p>
                  <button 
                    className="btn-primary w-full mb-4"
                    onClick={() => {
                      const packageType = index === 0 ? PACKAGE_TYPES['1-question'] :
                                       index === 1 ? PACKAGE_TYPES['3-questions'] :
                                       PACKAGE_TYPES['5-questions'];
                      handlePayment(packageType);
                    }}
                  >
                    Zamów wróżbę
                  </button>
                  <p className="text-gray-500 text-sm">
                    {pkg.time}
                  </p>
                </div>
              ))}
            </div>

            {/* Rating */}
            <div className="text-center mt-12">
              <div className="flex justify-center items-center mb-2">
                <span className="text-2xl font-bold text-gray-900 mr-2">4,9</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                4,9 / 5 na podstawie 225 ocen
              </p>
            </div>
          </div>

          {/* Tarot Packages */}
          <div className="mb-16">
            <h2 className="font-playfair text-2xl text-gray-900 text-center mb-12">
              Odkryj tajemnice Tarota
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Wybierz rozkład, zadaj swoje pytania i pozwól, aby karty odsłoniły przed Tobą odpowiedzi, których potrzebujesz i ukryj prawdy.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {tarotPackages.map((pkg, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
                  <div className="w-12 h-16 mx-auto mb-4 bg-gray-100 rounded flex items-center justify-center">
                    <span className="font-bold text-lg">{pkg.icon}</span>
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2">
                    {pkg.title}
                  </h3>
                  <div className="font-playfair text-3xl font-bold text-gray-900 mb-4">
                    {pkg.price}
                  </div>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {pkg.description}
                  </p>
                  <button 
                    className="btn-primary w-full mb-4"
                    onClick={() => {
                      const packageType = index === 0 ? PACKAGE_TYPES['3-cards'] :
                                       index === 1 ? PACKAGE_TYPES['5-cards'] :
                                       index === 2 ? PACKAGE_TYPES['love-tarot'] :
                                       PACKAGE_TYPES['celtic-cross'];
                      handlePayment(packageType);
                    }}
                  >
                    Zamów rozkład
                  </button>
                  <p className="text-gray-500 text-sm">
                    {pkg.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Extended Packages */}
          <div className="mb-16">
            <h2 className="font-playfair text-2xl text-gray-900 text-center mb-12">
              Rozszerzone rozkłady
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {extendedPackages.map((pkg, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
                  <div className="w-16 h-20 mx-auto mb-4 bg-gray-100 rounded flex items-center justify-center">
                    <span className="font-bold text-xl">{pkg.icon}</span>
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                    {pkg.title}
                  </h3>
                  <div className="font-playfair text-4xl font-bold text-gray-900 mb-4">
                    {pkg.price}
                  </div>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {pkg.description}
                  </p>
                  <button 
                    className="btn-primary w-full mb-4"
                    onClick={() => handlePayment(PACKAGE_TYPES['yearly'])}
                  >
                    Zamów rozkład
                  </button>
                  <p className="text-gray-500 text-sm">
                    {pkg.time}
                  </p>
                </div>
              ))}

              {/* Placeholder for second column */}
              <div className="hidden md:block"></div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-beige rounded-lg p-8 text-center">
            <h3 className="font-playfair text-xl text-gray-900 mb-4">
              Moje rozkłady Tarota
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Wszystkie rozkłady są przygotowywane indywidualnie z najwyższą starannością.
              Otrzymasz szczegółową interpretację dopasowaną do Twojej sytuacji życiowej.
              Każda wróżba zawiera konkretne wskazówki i rady na przyszłość.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cennik;
