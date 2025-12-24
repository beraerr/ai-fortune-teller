'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  slug: string;
  category: string;
}

const BlogPage = () => {
  // Sample blog posts - matching the design
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Nie możesz przestać o nim myśleć? 7 rytuałów, które pomogą Ci odzyskać miłość",
      excerpt: "Odkryj starożytne rytuały miłosne, które pomogą Ci przyciągnąć z powrotem ukochaną osobę...",
      author: "Wróżka Helena",
      date: "28 października 2025",
      image: "/images/backgrounds/register_page.png", // Using existing image as placeholder
      slug: "nie-mozesz-przestac-o-nim-myslec-7-rytualow",
      category: "miłość"
    },
    {
      id: 2,
      title: "Jak rozwinąć swoją intuicję: Praktyczny przewodnik",
      excerpt: "Intuicja to dar, który każdy z nas posiada. Naucz się go słuchać i wykorzystywać...",
      author: "Wróżka Helena",
      date: "25 października 2025",
      image: "/images/backgrounds/register_page.png",
      slug: "jak-rozwinac-swoja-intuicje",
      category: "duchowość"
    },
    {
      id: 3,
      title: "Znaczenie kart Tarota w miłości: Przewodnik dla początkujących",
      excerpt: "Poznaj najważniejsze karty miłosne i ich znaczenie w rozkładach tarota...",
      author: "Wróżka Helena",
      date: "22 października 2025",
      image: "/images/backgrounds/register_page.png",
      slug: "znaczenie-kart-tarota-w-milosci",
      category: "ezoteryka"
    }
  ];

  const blogCategories = [
    { name: "duchowość", count: 2 },
    { name: "ezoteryka", count: 7 },
    { name: "miłość", count: 5 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="section-padding bg-gray-50">
        <div className="container-max">
          {/* Top Quote Section */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <p className="font-playfair text-2xl lg:text-3xl text-gray-800 leading-relaxed italic">
              Z pasją dzielę się wiedzą o ezoteryce i sztuce<br />
              wróżbiarskiej, pomagając odnaleźć odpowiedzi na<br />
              najważniejsze życiowe pytania.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content - Blog Posts */}
            <div className="lg:col-span-2 space-y-8">
              {blogPosts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Blog Post Image */}
                  <div className="relative w-full h-64 bg-gradient-to-b from-teal-500 via-blue-800 to-blue-900 overflow-hidden">
                    {/* Mystical night scene */}
                    <div className="absolute inset-0">
                      {/* Stars */}
                      {Array.from({ length: 60 }).map((_, i) => (
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
                      <div className="absolute top-8 right-12">
                        <svg viewBox="0 0 100 100" className="w-20 h-20 text-red-400 drop-shadow-lg">
                          <defs>
                            <radialGradient id={`heartGradient-${post.id}`}>
                              <stop offset="0%" stopColor="rgba(239, 68, 68, 0.9)" />
                              <stop offset="100%" stopColor="rgba(239, 68, 68, 0.3)" />
                            </radialGradient>
                          </defs>
                          <path 
                            d="M50 85 C50 85, 20 60, 20 40 C20 25, 32 15, 50 35 C68 15, 80 25, 80 40 C80 60, 50 85, 50 85 Z" 
                            fill={`url(#heartGradient-${post.id})`}
                            className="animate-pulse"
                          />
                        </svg>
                      </div>
                      
                      {/* Woman silhouette with heart */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                        <svg viewBox="0 0 200 200" className="w-32 h-32">
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
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-800 to-transparent opacity-40">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute bottom-0 w-1 bg-green-600"
                            style={{
                              left: `${(i * 5) % 100}%`,
                              height: `${Math.random() * 8 + 4}px`,
                              opacity: 0.6
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Blog Post Content */}
                  <div className="p-6">
                    <h2 className="font-lato text-xl font-semibold text-gray-900 mb-3 leading-tight">
                      {post.title}
                    </h2>
                    
                    {/* Author and Date */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                        <img
                          src="/images/icons/r_photo.jpeg"
                          alt={post.author}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to initials if image fails
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = '<span class="text-gray-600 text-xs font-medium">WH</span>';
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

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
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
                    {blogCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={`/blog?category=${category.name}`}
                        className="block text-gray-700 hover:text-black text-sm transition-colors"
                      >
                        {category.name} <span className="text-gray-500">({category.count})</span>
                      </Link>
                    ))}
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

export default BlogPage;

