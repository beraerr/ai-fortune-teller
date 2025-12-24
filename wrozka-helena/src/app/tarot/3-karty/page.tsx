'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnhancedTarotDeck from '@/components/EnhancedTarotDeck';
import { getCardsByIds, type TarotCard } from '@/lib/tarotDeck';

const Tarot3Karty = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [revealedCards, setRevealedCards] = useState<TarotCard[]>([]);
  const [aiReading, setAiReading] = useState<string>('');
  const [userQuestion, setUserQuestion] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoadingFullReading, setIsLoadingFullReading] = useState(false);

  const requiredCards = 3;
  const positions = ['Przeszłość', 'Teraźniejszość', 'Przyszłość'];

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
      
      // Get the actual card data
      const cards = getCardsByIds(selectedCards);
      setRevealedCards(cards);
      
      // Short delay for the reveal animation
      setTimeout(() => {
        setShowReading(true);
        setIsReading(false);
      }, 1500);
    }
  };

  const handleGetFullReading = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      alert('Proszę podać imię');
      return;
    }

    setIsLoadingFullReading(true);

    try {
      const response = await fetch('/api/ai-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          question: userQuestion || 'Proszę o ogólną interpretację wylosowanych kart.',
          cardIds: selectedCards,
          language: 'PL',
        }),
      });

      const data = await response.json();
      
      if (data.answer) {
        setAiReading(data.answer);
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
    setUserQuestion('');
    setUserName('');
  };

  if (showReading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="section-padding bg-beige">
          <div className="container-max">
            <div className="text-center mb-8">
              <h1 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-4">
                Oto Twój rozkład kart
              </h1>
              <p className="text-gray-600 mb-8">
                <button 
                  onClick={handleReset}
                  className="underline hover:text-gray-800 transition-colors"
                >
                  CHCESZ WYLOSOWAĆ INNE KARTY? KLIKNIJ TUTAJ
                </button>
              </p>
            </div>

            {/* Reading Results */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-sm">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {revealedCards.map((card, index) => (
                  <div key={card.id} className="text-center">
                    <h3 className="font-semibold text-gray-700 mb-2">{positions[index]}</h3>
                    <div className="w-24 h-36 mx-auto bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg mb-4 flex items-center justify-center shadow-lg border-2 border-yellow-500/30">
                      <span className="text-yellow-400 text-3xl">✦</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mb-1">{card.namePL}</p>
                    <p className="text-xs text-gray-500">{card.meaningUpright}</p>
                  </div>
                ))}
              </div>

              {/* AI Reading Result */}
              {aiReading && (
                <div className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                  <h3 className="font-playfair text-xl text-gray-900 mb-4 flex items-center gap-2">
                    <span>✨</span> Twoja osobista interpretacja
                  </h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {aiReading}
                  </div>
                </div>
              )}

              {/* Request Full Reading Form */}
              {!aiReading && (
                <div className="text-center">
                  <p className="text-gray-600 italic mb-6">
                    Chcesz wiedzieć co te karty oznaczają konkretnie dla Ciebie? 
                    Wróżka Helena przeprowadzi pełną interpretację, która rozjaśni Twoją sytuację.
                  </p>
                  <form onSubmit={handleGetFullReading} className="space-y-4 max-w-lg mx-auto">
                    <input
                      type="text"
                      placeholder="Twoje imię..."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-800"
                      required
                    />
                    <textarea
                      placeholder="Zadaj pytanie lub opisz, co Cię nurtuje... (opcjonalne)"
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 resize-none text-gray-800"
                      rows={4}
                    />
                    <button 
                      type="submit"
                      disabled={isLoadingFullReading}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoadingFullReading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span>Wróżka Helena czyta karty...</span>
                        </>
                      ) : (
                        <>
                          <span>✨</span>
                          <span>Odkryj pełne znaczenie kart</span>
                          <span>→</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* New Reading Button */}
              {aiReading && (
                <div className="text-center mt-6">
                  <button 
                    onClick={handleReset}
                    className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    Wylosuj nowe karty
                  </button>
                </div>
              )}
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
            <h1 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6 italic">
              Rozkład Tarota z 3 kart
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Rozkład Tarota na przyszłość — <strong>wylosuj trzy karty Tarota</strong> i poznaj ich znaczenie:
              <em> przeszłość, teraźniejszość i przyszłość</em>.
            </p>

            <div className="mb-12">
              <button className="bg-black text-white px-8 py-3 rounded text-sm font-medium mb-4">
                Zamów rozkład
              </button>
              <p className="text-gray-500 text-sm">
                lub wylosuj karty poniżej:
              </p>
            </div>
          </div>

          {/* Enhanced Card Selection */}
          <EnhancedTarotDeck
            selectedCards={selectedCards}
            onCardSelect={handleCardSelect}
            requiredCards={requiredCards}
            onRevealCards={handleRevealCards}
            isReading={isReading}
            title="Weź głęboki oddech i skup się na swoim pytaniu"
            subtitle="WYBIERZ"
          />

          {/* Information Sections */}
          <div className="mt-16 grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="mb-6">
                <span className="text-sm text-gray-500 italic">Tarot — Rozkład 3 Kart</span>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mt-2 mb-4">
                  Spojrzenie w przeszłość, teraźniejszość i przyszłość
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                Stoisz na rozdrożu? Nurtuje Cię jakaś kwestia i pragniesz jasności? <em>Rozkład 3 Kart</em> to idealne
                rozwiązanie, gdy potrzebujesz szybkiego wglądu w daną sytuację i wskazówek na przyszłość.
              </p>

              <button className="bg-black text-white px-6 py-3 rounded text-sm font-medium">
                Wylosuj karty
              </button>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  <strong>Przeszłość, Teraźniejszość, Przyszłość</strong>
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Ten rozkład jest dla mnie jak kompas, który wskazuje kierunek w gąszczu możliwości.
                  To idealne rozwiązanie dla osób, które cenią sobie konkretne odpowiedzi i praktyczne wskazówki.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div>
                <p className="text-gray-600 leading-relaxed">
                  Prosty, ale niezwykle skuteczny rozkład 3 kart to idealne narzędzie do uzyskania zwięzłych
                  odpowiedzi i wglądów w konkretną sytuację. Karty reprezentują kolejno: przeszłość, teraźniejszość
                  i przyszłość związaną z Twoim pytaniem. Ten klasyczny układ pozwala zrozumieć źródła problemu,
                  obecne okoliczności oraz możliwe scenariusze na drodze przed Tobą.
                </p>
              </div>

              <div>
                <p className="text-gray-600 leading-relaxed">
                  Rozkład 3 kart sięga korzeniami głęboko w historię wróżbiarstwa. Już w starożytności znano jego
                  moc objawiania prawd ukrytych w nurcie czasu. Trzy karty to trzy zasłony opadające przed Twoimi
                  oczami — ukazujące drogę przebytą, stan obecny oraz niewiadome ścieżki czekające na odkrycie.
                </p>
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="mt-16 bg-gray-100 rounded-lg p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-6">
                  Czy zastanawiasz się...
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    Co powinnam zrobić w tej konkretnej sytuacji?
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    W jakim kierunku zmierza moje życie?
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    Co czeka mnie w pracy w najbliższym czasie?
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    Co mogę zrobić, aby poprawić moją relację z partnerem?
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    Czy powinnam podjąć ryzykowną decyzję?
                  </li>
                </ul>

                <p className="text-gray-600 text-sm mt-6">
                  To tylko przykłady — karty Tarota mogą odpowiedzieć na każde Twoje pytanie.
                </p>

                <div className="mt-6 space-x-4">
                  <button className="bg-black text-white px-6 py-2 rounded text-sm">
                    Zadaj swoje pytanie
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded text-sm hover:bg-gray-50 transition-colors">
                    Zobacz przykładowy rozkład
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-6">
                  Co odkryjesz dzięki temu rozkładowi?
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    Uzyskasz zwięzłe, ale trafne odpowiedzi na nurtujące Cię pytania
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    Zrozumiesz kontekst sytuacji — jej przyczyny, obecny stan i potencjalne następstwa
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    Dostaniesz wskazówki co do najbardziej optymalnych działań
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    Rozwiejesz dylematy i wątpliwości utrudniające podjęcie decyzji
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    Zyskasz spokój i większą pewność co do obranego kierunku
                  </li>
                </ul>

                <button className="bg-black text-white px-6 py-2 rounded text-sm mt-6">
                  Wylosuj 3 karty Tarota
                </button>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-16 bg-black text-white rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center text-yellow-400 mb-4">
                  ★★★★★
                </div>
                <p className="text-sm leading-relaxed mb-4">
                  Byłam zaskoczona, jak wiele informacji można uzyskać z zaledwie trzech kart!
                  Interpretacja była bardzo trafna i pomogła mi podjąć ważną decyzję.
                </p>
                <p className="text-gray-300 text-sm">~ Anna, 35 lat</p>
              </div>

              <div className="text-center">
                <div className="flex justify-center text-yellow-400 mb-4">
                  ★★★★★
                </div>
                <p className="text-sm leading-relaxed mb-4">
                  Rozkład 3 kart to strzał w dziesiątkę! Dzięki niemu w końcu uporałam się z dylematem
                  dotyczącym zmiany pracy. Helena w jasny sposób wyłożyła całą sytuację i dała mi ostatni
                  impuls, którego potrzebowałam. Jestem bardzo zadowolona!
                </p>
                <p className="text-gray-300 text-sm">~ Dorota, 28 lat</p>
              </div>

              <div className="text-center">
                <div className="flex justify-center text-yellow-400 mb-4">
                  ★★★★★
                </div>
                <p className="text-sm leading-relaxed mb-4">
                  Dzięki rozkładowi 3 kart w końcu zrozumiałem, co blokuje moje postępy. Helena pomogła mi
                  spojrzeć na moje problemy z nowej perspektywy. Teraz wiem, co robić dalej.
                </p>
                <p className="text-gray-300 text-sm">~ Michał, 41 lat</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tarot3Karty;
