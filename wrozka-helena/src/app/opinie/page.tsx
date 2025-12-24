'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Review {
  id: number;
  rating: number;
  date: string;
  content: string;
  author: string;
  verified: boolean;
  avatar: string;
}

const OpiniePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newReview, setNewReview] = useState({
    rating: 0,
    content: '',
    name: '',
    email: ''
  });

  // Sample reviews matching the original website
  const reviews: Review[] = [
    {
      id: 1,
      rating: 5,
      date: "10 stycznia 2025",
      content: "Moje \"spotkanie\" z Heleną to niezwykle doświadczenie rzadko bowiem spotyka się osoby z tak olbrzymią empatią, wrażliwością, mądrością i dobrem w sercu... Każdy kontakt miał terapeutyczną wręcz moc... Dziękuję za każde ciepłe słowo i niesamowitą życzliwość! Myślę sobie, że każdy kto stoi na życiowym zakręcie powinien spotkać na swojej drodze taką osobę jak Helena... Serdeczności!",
      author: "Anita",
      verified: true,
      avatar: "https://ext.same-assets.com/3736986635/33923259.svg"
    },
    {
      id: 2,
      rating: 5,
      date: "31 lipca 2025",
      content: "Bardzo trafna wróżba polecam",
      author: "Marlena",
      verified: true,
      avatar: "https://ext.same-assets.com/3736986635/1491568036.svg"
    },
    {
      id: 3,
      rating: 5,
      date: "28 lipca 2025",
      content: "Wróżka Helena, pozwoliła mi bardziej uwierzyć w siebie, w swoje jeszcze nie odkryte talenty, spojrzeć w głąb swojego serca, otworzyć się na nowe wyzwania i iść naprzód nie oglądając się za siebie.",
      author: "Mateusz",
      verified: true,
      avatar: "https://ext.same-assets.com/3736986635/3459113284.svg"
    },
    {
      id: 4,
      rating: 5,
      date: "27 lipca 2025",
      content: "Szybkie i pomocne odpowiedzi.\n\nWróżby przyniosły mi wskazówki na przyszłość i pomogły w podjęciu właściwych decyzji. Mam nadzieję, że wszystko poukłada się pozytywnie dla mnie.",
      author: "Mirosława",
      verified: true,
      avatar: "https://ext.same-assets.com/3736986635/2906436349.svg"
    },
    {
      id: 5,
      rating: 5,
      date: "23 lipca 2025",
      content: "Sympatyczne wróżby",
      author: "Paula",
      verified: true,
      avatar: "https://ext.same-assets.com/3736986635/435213764.svg"
    },
    {
      id: 6,
      rating: 5,
      date: "22 lipca 2025",
      content: "Z całego serca polecam wróżkę Helenę 💖",
      author: "Justyna",
      verified: true,
      avatar: "https://ext.same-assets.com/3736986635/3904224170.svg"
    },
    {
      id: 7,
      rating: 5,
      date: "20 lipca 2025",
      content: "Super bardzo pomocne i uspokoiło",
      author: "Edyta",
      verified: true,
      avatar: "https://ext.same-assets.com/3736986635/3714115011.svg"
    },
    {
      id: 8,
      rating: 5,
      date: "20 lipca 2025",
      content: "Słowa wróżki Heleny naprawdę się sprawdzają co do mojej sytuacji.Dziękuję za pomoc i na pewno skorzystam z pani usług jeszcze wiele razy❤",
      author: "Weronika",
      verified: true,
      avatar: "https://ext.same-assets.com/3736986635/47083565.svg"
    },
    {
      id: 9,
      rating: 5,
      date: "18 lipca 2025",
      content: "Bardzo wyczerpujący opis. Liczę na to, że wróżba się spełni ...tyle ciepła i mądrości. Dziękuję",
      author: "Monika",
      verified: true,
      avatar: "https://ext.same-assets.com/3736986635/2466163958.svg"
    },
    {
      id: 10,
      rating: 5,
      date: "15 lipca 2025",
      content: "Sprawy u mnie się jeszcze nie wyjaśniły natomiast Helena wyczuła emocje panujące wstecz obecnie i te nadchodzące . Jestem pełna nadziei . Wspaniała wróżba i opieka emocjonalna z jej strony\n\nDziękuję i polecam",
      author: "Monika",
      verified: true,
      avatar: "https://ext.same-assets.com/3736986635/1284036233.svg"
    }
  ];

  const reviewsPerPage = 10;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const sizeClass = size === 'lg' ? 'text-xl' : 'text-sm';
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`${sizeClass} ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const handleStarClick = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the review to your backend
    console.log('New review:', newReview);
    // Reset form
    setNewReview({ rating: 0, content: '', name: '', email: '' });
    alert('Dziękujemy za opinię! Zostanie ona dodana po weryfikacji.');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-12">
                <h1 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
                  Wasze opinie
                </h1>
                <p className="text-gray-600 italic leading-relaxed mb-8">
                  Z serca dziękuję za każde ciepłe słowo i pozytywną myśl, którą ze mną dzielicie.
                  Wasze opinie i zaufanie są dla mnie źródłem nieustannej inspiracji i motywacji do dalszej pracy.<br/>
                  <span className="italic">Z miłością,<br/>Wróżka Helena</span>
                </p>

                {/* Rating Summary */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <div className="mr-6">
                      <div className="text-4xl font-bold text-gray-900 mb-1">4,9</div>
                      <div className="flex text-yellow-400 text-lg mb-1">
                        {renderStars(5, 'lg')}
                      </div>
                      <div className="text-sm text-gray-600">4,9 / 5 (na podstawie 225 ocen)</div>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <span className="w-16 text-gray-600">Wyjątkowa</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                          <span className="w-8 text-gray-600">95%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-16 text-gray-600">Bardzo dobra</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '3%' }}></div>
                          </div>
                          <span className="w-8 text-gray-600">3%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-16 text-gray-600">Dobra</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '1%' }}></div>
                          </div>
                          <span className="w-8 text-gray-600">1%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-16 text-gray-600">Przeciętna</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                            <div className="bg-gray-200 h-2 rounded-full"></div>
                          </div>
                          <span className="w-8 text-gray-600">0%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-16 text-gray-600">Rozczarowująca</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '1%' }}></div>
                          </div>
                          <span className="w-8 text-gray-600">1%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a href="#dodaj" className="btn-primary text-sm">Dodaj opinię</a>
                    <a href="/cennik" className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                      Zamów wróżbę
                    </a>
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="mb-8">
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-6">
                    Wasze odczucia i doświadczenia
                  </h3>

                  <div className="space-y-6">
                    {currentReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex text-yellow-400 mb-2">
                          {renderStars(review.rating)}
                        </div>
                        <div className="text-sm text-gray-600 mb-3">{review.date}</div>
                        <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                          {review.content}
                        </p>
                        <div className="flex items-center">
                          <img
                            src={review.avatar}
                            alt=""
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span className="text-gray-700 font-medium mr-2">— {review.author}</span>
                          {review.verified && (
                            <div className="flex items-center text-green-600 text-sm">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Zweryfikowana
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-center space-x-2 mt-8">
                    {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${
                          currentPage === i + 1
                            ? 'bg-black text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    {totalPages > 3 && (
                      <>
                        <span className="text-gray-400">...</span>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
                        >
                          23
                        </button>
                      </>
                    )}
                    {currentPage < totalPages && (
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        Następne
                      </button>
                    )}
                  </div>
                </div>

                {/* Review Submission Form */}
                <div id="dodaj" className="mt-16">
                  <h3 className="font-playfair text-2xl text-gray-900 mb-4">
                    Zapraszam Cię do podzielenia się swoją historią
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Twoje doświadczenie może być światłem przewodnim dla kogoś, kto właśnie rozpoczyna swoją duchową podróż.
                  </p>

                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twoja ogólna ocena
                      </label>
                      <div className="flex space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleStarClick(i + 1)}
                            className={`text-2xl ${
                              i < newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                            } hover:text-yellow-400 transition-colors`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twoje odczucia
                      </label>
                      <textarea
                        rows={6}
                        placeholder="Podziel się swoją opinią"
                        className="form-input"
                        value={newReview.content}
                        onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twoje imię
                      </label>
                      <input
                        type="text"
                        placeholder="Podaj swoje imię"
                        className="form-input"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twój e-mail
                      </label>
                      <input
                        type="email"
                        placeholder="Podaj swój e-mail z zamówienia"
                        className="form-input"
                        value={newReview.email}
                        onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors"
                    >
                      Dodaj opinię
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Tarot Services */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-playfair text-lg font-bold text-gray-900 mb-4">
                    Postaw Tarota
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Pozwól, by Tarot rozjaśnił Twoją drogę. Wylosuj karty specjalnie dla Ciebie i prześl ich wnikliwą interpretację.
                  </p>
                  <div className="space-y-2 text-sm">
                    <a href="/tarot/milosny" className="block text-gray-700 hover:text-black underline">
                      Tarot Miłosny (90zł)
                    </a>
                    <a href="/tarot/3-karty" className="block text-gray-700 hover:text-black underline">
                      Tarot na przyszłość (50zł)
                    </a>
                    <a href="/tarot/krzyz-celtycki" className="block text-gray-700 hover:text-black underline">
                      Rozkład ogólny z 10 kart (200zł)
                    </a>
                  </div>
                </div>

                {/* Daily Life Magic */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-playfair text-lg font-bold text-gray-900 mb-4">
                    Magia w codziennym życiu
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Praktyczna wiedza dla Twojego rozwoju.
                  </p>
                  <div className="space-y-2 text-sm">
                    <Link href="/blog/jak-zadawac-pytania-wrozce" className="block text-gray-700 hover:text-black underline">
                      Jak zadawać pytania wróżce
                    </Link>
                    <Link href="/blog/jak-rozwijac-intuicje" className="block text-gray-700 hover:text-black underline">
                      Jak rozwijać swoją intuicję
                    </Link>
                    <Link href="/blog/jak-wzmocnic-zwiazek" className="block text-gray-700 hover:text-black underline">
                      Jak wzmocnić związek
                    </Link>
                  </div>
                </div>

                {/* Blog Topics */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-playfair text-lg font-bold text-gray-900 mb-4">
                    Tematy na blogu
                  </h3>
                  <div className="space-y-2 text-sm">
                    <Link href="/blog/duchowosc" className="block text-gray-700 hover:text-black">
                      duchowość <span className="text-gray-500">(2)</span>
                    </Link>
                    <Link href="/blog/ezoteryka" className="block text-gray-700 hover:text-black">
                      ezoteryka <span className="text-gray-500">(7)</span>
                    </Link>
                    <Link href="/blog/milosc" className="block text-gray-700 hover:text-black">
                      miłość <span className="text-gray-500">(5)</span>
                    </Link>
                  </div>
                </div>

                {/* Search */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-playfair text-lg font-bold text-gray-900 mb-4">
                    Szukasz czegoś konkretnego?
                  </h3>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Szukaj..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OpiniePage;
