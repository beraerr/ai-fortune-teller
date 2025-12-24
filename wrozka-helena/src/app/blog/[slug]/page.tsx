'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { use } from 'react';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  slug: string;
  category: string;
}

// This would typically come from a CMS or database
const blogPosts: Record<string, BlogPost> = {
  'nie-mozesz-przestac-o-nim-myslec-7-rytualow': {
    id: 1,
    title: "Nie możesz przestać o nim myśleć? 7 rytuałów, które pomogą Ci odzyskać miłość",
    content: `
      <p>Miłość to jedna z najsilniejszych sił we wszechświecie. Kiedy tracimy kogoś bliskiego, ból może być przytłaczający. Ale istnieją starożytne rytuały, które mogą pomóc przyciągnąć z powrotem ukochaną osobę.</p>
      
      <h2>1. Rytuał Świecy Różanej</h2>
      <p>Zapal różową świecę w piątek wieczorem. Skup się na wizualizacji was razem, szczęśliwych i zakończonych. Pozwól świecy spalić się do końca.</p>
      
      <h2>2. Rytuał Lustra</h2>
      <p>Stań przed lustrem o północy i wypowiedz jego imię trzy razy. Wyobraź sobie, jak wraca do Ciebie pełen miłości i żalu.</p>
      
      <h2>3. Rytuał Czerwonej Nici</h2>
      <p>Zawiąż czerwoną nić wokół lewego nadgarstka, wypowiadając jego imię. Nosić ją przez 7 dni, a następnie spalić w bezpiecznym miejscu.</p>
      
      <h2>4. Rytuał Księżyca</h2>
      <p>Podczas pełni księżyca wyjdź na zewnątrz i poproś księżyc o pomoc w przywróceniu miłości. Wypowiedz swoje pragnienia głośno.</p>
      
      <h2>5. Rytuał Różanych Płatków</h2>
      <p>Rozrzuć płatki róż w kształcie serca w swoim pokoju. Połóż się w środku i wizualizuj was razem.</p>
      
      <h2>6. Rytuał Fotografii</h2>
      <p>Weź zdjęcie was razem i owinij je czerwoną wstążką. Trzymaj je pod poduszką przez 9 nocy, myśląc o nim przed snem.</p>
      
      <h2>7. Rytuał Modlitwy</h2>
      <p>Każdego ranka i wieczoru modl się o jego powrót. Bądź szczera w swoich intencjach i wierz w moc swoich słów.</p>
      
      <p>Pamiętaj, że rytuały działają najlepiej, gdy są wykonywane z czystym sercem i pozytywnymi intencjami. Nie używaj ich do manipulacji, ale do przywrócenia prawdziwej miłości.</p>
    `,
    author: "Wróżka Helena",
    date: "28 października 2025",
    image: "/images/backgrounds/register_page.png",
    slug: "nie-mozesz-przestac-o-nim-myslec-7-rytualow",
    category: "miłość"
  }
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="section-padding">
          <div className="container-max text-center">
            <h1 className="font-playfair text-3xl text-gray-900 mb-4">Post nie został znaleziony</h1>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 underline">
              Powrót do bloga
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <Link 
                href="/blog" 
                className="inline-block text-gray-600 hover:text-gray-900 mb-6 text-sm underline"
              >
                ← Powrót do bloga
              </Link>

              {/* Blog Post Image */}
              <div className="relative w-full h-96 bg-gradient-to-b from-teal-500 via-blue-800 to-blue-900 rounded-lg overflow-hidden mb-8">
                <div className="absolute inset-0">
                  {/* Stars */}
                  {Array.from({ length: 80 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                      style={{
                        left: `${(i * 17) % 100}%`,
                        top: `${(i * 23) % 100}%`,
                        opacity: Math.random() * 0.6 + 0.4,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                  
                  {/* Large glowing heart in sky */}
                  <div className="absolute top-12 right-16">
                    <svg viewBox="0 0 100 100" className="w-32 h-32 text-red-400 drop-shadow-lg">
                      <defs>
                        <radialGradient id="heartGradientPost">
                          <stop offset="0%" stopColor="rgba(239, 68, 68, 0.9)" />
                          <stop offset="100%" stopColor="rgba(239, 68, 68, 0.3)" />
                        </radialGradient>
                      </defs>
                      <path 
                        d="M50 85 C50 85, 20 60, 20 40 C20 25, 32 15, 50 35 C68 15, 80 25, 80 40 C80 60, 50 85, 50 85 Z" 
                        fill="url(#heartGradientPost)"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                  
                  {/* Woman silhouette with heart */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <svg viewBox="0 0 200 200" className="w-48 h-48">
                      {/* Woman silhouette */}
                      <path 
                        d="M100 180 L90 140 L80 120 L80 100 L85 90 L90 80 L100 75 L110 80 L115 90 L120 100 L120 120 L110 140 Z" 
                        fill="rgba(0, 0, 0, 0.6)"
                      />
                      {/* Heart in hands */}
                      <g transform="translate(85, 100)">
                        <path 
                          d="M15 25 C15 25, 5 15, 5 10 C5 5, 10 2, 15 8 C20 2, 25 5, 25 10 C25 15, 15 25, 15 25 Z" 
                          fill="rgba(239, 68, 68, 0.9)"
                          className="drop-shadow-lg"
                        />
                      </g>
                    </svg>
                  </div>
                  
                  {/* Grass/flowers at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-green-800 to-transparent opacity-40">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute bottom-0 w-1 bg-green-600"
                        style={{
                          left: `${(i * 3.3) % 100}%`,
                          height: `${Math.random() * 12 + 6}px`,
                          opacity: 0.6
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Blog Post Header */}
              <div className="mb-8">
                <h1 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/icons/r_photo.jpeg"
                      alt={post.author}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<span class="text-gray-600 text-sm font-medium">WH</span>';
                        }
                      }}
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{post.author}</span>
                    <span className="mx-2">—</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>

              {/* Blog Post Content */}
              <div 
                className="blog-content max-w-none text-gray-700 leading-relaxed font-lato"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <style dangerouslySetInnerHTML={{ __html: `
                .blog-content h2 {
                  font-family: 'Playfair Display', serif;
                  font-size: 1.5rem;
                  font-weight: 700;
                  color: #1f2937;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                }
                .blog-content p {
                  margin-bottom: 1rem;
                  line-height: 1.8;
                }
                .blog-content strong {
                  font-weight: 600;
                  color: #374151;
                }
              `}} />
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="space-y-8">
                {/* Postaw Tarota Section */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="font-lato font-semibold text-gray-900 mb-3 uppercase tracking-wide text-sm">
                    Postaw Tarota
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Pozwól, by Tarot rozjaśnił Twoją drogę. Wylosuję karty specjalnie dla Ciebie i prześlę ich wnikliwą interpretację.
                  </p>
                  <div className="space-y-2">
                    <Link 
                      href="/tarot/milosny" 
                      className="block text-gray-700 hover:text-black underline text-sm transition-colors"
                    >
                      Tarot Miłosny (90zł)
                    </Link>
                    <Link 
                      href="/tarot/3-karty" 
                      className="block text-gray-700 hover:text-black underline text-sm transition-colors"
                    >
                      Tarot na przyszłość (50zł)
                    </Link>
                    <Link 
                      href="/tarot/krzyz-celtycki" 
                      className="block text-gray-700 hover:text-black underline text-sm transition-colors"
                    >
                      Rozkład ogólny z 10 kart (200zł)
                    </Link>
                  </div>
                </div>

                {/* Magia w codziennym życiu Section */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="font-lato font-semibold text-gray-900 mb-3 uppercase tracking-wide text-sm">
                    Magia w codziennym życiu
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Praktyczna wiedza dla Twojego rozwoju.
                  </p>
                  <div className="space-y-2">
                    <Link 
                      href="/blog/jak-zadawac-pytania-wrozce" 
                      className="block text-gray-700 hover:text-black underline text-sm transition-colors"
                    >
                      Jak zadawać pytania wróżce
                    </Link>
                    <Link 
                      href="/blog/jak-rozwijac-intuicje" 
                      className="block text-gray-700 hover:text-black underline text-sm transition-colors"
                    >
                      Jak rozwijać swoją intuicję
                    </Link>
                    <Link 
                      href="/blog/jak-wzmocnic-zwiazek" 
                      className="block text-gray-700 hover:text-black underline text-sm transition-colors"
                    >
                      Jak wzmocnić związek
                    </Link>
                  </div>
                </div>

                {/* Tematy na blogu Section */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="font-lato font-semibold text-gray-900 mb-3 uppercase tracking-wide text-sm">
                    Tematy na blogu
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/blog?category=duchowość"
                      className="block text-gray-700 hover:text-black text-sm transition-colors"
                    >
                      duchowość <span className="text-gray-500">(2)</span>
                    </Link>
                    <Link
                      href="/blog?category=ezoteryka"
                      className="block text-gray-700 hover:text-black text-sm transition-colors"
                    >
                      ezoteryka <span className="text-gray-500">(7)</span>
                    </Link>
                    <Link
                      href="/blog?category=miłość"
                      className="block text-gray-700 hover:text-black text-sm transition-colors"
                    >
                      miłość <span className="text-gray-500">(5)</span>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

