'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OMnie = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="section-padding bg-white">
        <div className="container-max">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-8 h-8 mx-auto mb-6">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-600">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>

            <h1 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
              O mnie
            </h1>
          </div>

          {/* Main content */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-2xl text-gray-900 mb-6">
                Jestem Helena, Twoja przewodniczka na ścieżce życia i miłości.
              </h2>
            </div>

            <div className="space-y-8 text-gray-600 leading-relaxed">
              <p>
                Od lat pomagam ludziom odkrywać ich prawdziwy potencjał i odnajdywać szczęście.
                Posiadam dar jasnowidzenia i bogate doświadczenie wróżbiarskie, co pozwala mi na
                głębokie zrozumienie ludzkich problemów i trafne przewidywanie przyszłości.
              </p>

              <p>
                Z moją pomocą pokonasz przeciwności losu, podejmiesz mądre decyzje i
                osiągniesz swoje cele. Odkryjesz sekrety swojej przeszłości, teraźniejszości i
                przyszłości, a także poznasz swoje prawdziwe przeznaczenie.
              </p>

              <p>
                Jestem empatyczną i doświadczoną osobą, która zawsze kieruje się dobrem swoich
                klientów. Setki zadowolonych osób korzysta z moich usług.
              </p>

              <p>
                Jeśli czujesz się zagubiona, stoisz przed trudnymi wyborami lub po prostu pragniesz
                poznać swoją przyszłość, zapraszam Cię do skorzystania z mojej pomocy.
              </p>

              <p>
                Zapraszam Cię do odkrycia magii wróżb i otwarcia się na nowe możliwości.
              </p>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16 p-8 bg-beige rounded-lg">
              <h3 className="font-playfair text-xl text-gray-900 mb-4">
                Gotowa na odkrycie swojej przyszłości?
              </h3>
              <p className="text-gray-600 mb-6">
                Poznaj odpowiedzi na nurtujące Cię pytania.
              </p>
              <a href="/cennik" className="btn-primary inline-block">
                Zamów wróżbę
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OMnie;
