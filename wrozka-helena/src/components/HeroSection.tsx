'use client';

import { useState } from 'react';

const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    question: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Dziękujemy! Wróżba wkrótce trafi na Twój e-mail.');
        setFormData({ name: '', email: '', birthDate: '', question: '' });
      } else {
        alert('Wystąpił błąd. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Wystąpił błąd. Spróbuj ponownie.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="min-h-screen bg-white py-8">
      <div className="max-w-screen-2xl mx-auto px-12">
        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row items-start gap-32">
          
          {/* Left Column - Main Content - MUCH WIDER */}
          <div className="flex-1 max-w-3xl">
            {/* Main Heading - SOFTER COLORS */}
            <h1 className="font-playfair text-4xl lg:text-5xl font-light text-gray-800 leading-relaxed mb-10">
              <em className="italic font-light text-gray-700">Wróżby online</em> — poznaj odpowiedzi na nurtujące Cię pytania
            </h1>
            
            {/* Subtitle */}
            <p className="text-gray-700 text-lg leading-relaxed mb-10 max-w-xl">
              W 15 minut wyślę Ci wróżbę ze szczegółową odpowiedzią,
              dzięki której odnajdziesz szczęście i podejmiesz trafne decyzje.
            </p>

            {/* Form - MUCH WIDER INPUTS */}
            <form onSubmit={handleSubmit} className="space-y-5 mb-10">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                  Imię:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Twoje imię"
                  className="w-full max-w-2xl px-5 py-4 border border-gray-300 rounded bg-white focus:outline-none focus:border-gray-500 text-gray-800 text-base transition-colors"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                  Adres e-mail:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Twój adres e-mail"
                  className="w-full max-w-2xl px-5 py-4 border border-gray-300 rounded bg-white focus:outline-none focus:border-gray-500 text-gray-800 text-base transition-colors"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="birthDate" className="block text-sm text-gray-700 mb-2">
                  Data urodzenia:
                </label>
                <input
                  type="text"
                  id="birthDate"
                  name="birthDate"
                  placeholder="dd-mm-rrrr"
                  className="w-full max-w-2xl px-5 py-4 border border-gray-300 rounded bg-white focus:outline-none focus:border-gray-500 text-gray-800 text-base transition-colors"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="question" className="block text-sm text-gray-700 mb-2">
                  Twoje pytanie:
                </label>
                <textarea
                  id="question"
                  name="question"
                  rows={4}
                  placeholder="Wpisz jedno pytanie, na które chcesz otrzymać odpowiedź"
                  className="w-full max-w-2xl px-5 py-4 border border-gray-300 rounded bg-white focus:outline-none focus:border-gray-500 resize-none text-gray-800 text-base transition-colors"
                  value={formData.question}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button - WIDER */}
              <button
                type="submit"
                className="w-full max-w-2xl bg-gray-800 text-white px-6 py-4 rounded font-medium hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-base uppercase tracking-wide"
              >
                <span>Zamów wróżbę</span>
                <span className="text-lg">✨</span>
              </button>
            </form>

            {/* Moon Phases */}
            <div className="flex justify-center mt-10">
              <img
                src="/images/icons/moon_phase.png"
                alt="Moon phases"
                className="h-6 w-auto opacity-70"
              />
            </div>
          </div>

          {/* Right Column - Image and Content - MORE SPACE */}
          <div className="flex-1 max-w-2xl">
            {/* Mystical Image - SOFTER STYLING */}
            <div className="mb-10">
              <img
                src="/images/backgrounds/register_page.png"
                alt="Mystical tarot reading scene"
                className="w-full h-auto object-cover rounded-2xl shadow-xl"
              />
            </div>

            {/* Content Text - SOFTER COLORS */}
            <div className="space-y-5 text-base leading-relaxed">
              <p className="text-gray-700">
                Z tej strony <strong className="font-playfair italic text-gray-800">Wróżka Helena</strong>,
                Twoja przewodniczka na ścieżce życia i miłości.
              </p>
              
              <p className="text-gray-700">
                Od ponad 20 lat pomagam ludziom odkrywać ich prawdziwy potencjał i odnajdywać szczęście.
                Posiadam dar jasnowidzenia i bogate doświadczenie wróżbiarskie, co pozwala mi na głębokie
                zrozumienie ludzkich problemów i trafne przewidywanie przyszłości.
              </p>
              
              <p className="text-gray-700">
                Jako numerologiczna 11 posiadam wysoką świadomość, intuicję oraz zdolność inspirowania
                i prowadzenia innych na drodze duchowego rozwoju.
              </p>
              
              <p className="text-gray-700">
                Jeśli czujesz się zagubiony, stoisz przed trudnymi wyborami, lub po prostu pragniesz
                spojrzeć w przyszłość, zapraszam Cię do skorzystania z mojej pomocy.
              </p>

              {/* Online Status */}
              <div className="flex items-center text-green-600 mt-8">
                <div className="w-3 h-3 bg-green-600 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium uppercase tracking-wide">JESTEM ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
