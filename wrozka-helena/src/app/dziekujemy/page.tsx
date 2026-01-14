import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Suspense } from 'react';
import PaymentStatus from '@/components/PaymentStatus';

const ThankYouPage = async ({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) => {
  const params = await searchParams;
  return (
    <div className="min-h-screen">
      <Header />
      <main className="section-padding bg-beige">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>

            <h1 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
              Dziękujemy za zamówienie!
            </h1>

            <Suspense fallback={<p className="text-gray-600 leading-relaxed mb-8">Weryfikowanie płatności...</p>}>
              <PaymentStatus sessionId={params.session_id} />
            </Suspense>

            <p className="text-gray-600 leading-relaxed mb-8">
              Twoje zamówienie zostało pomyślnie przyjęte. Wróżba wkrótce trafi na Twój e-mail.
            </p>

            <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
              <h2 className="font-playfair text-xl text-gray-900 mb-4">
                Co dzieje się dalej?
              </h2>

              <div className="space-y-4 text-gray-600 text-left">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Potwierdzenie płatności</p>
                    <p className="text-sm text-gray-500">Otrzymasz e-mail z potwierdzeniem zamówienia</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Przygotowanie wróżby</p>
                    <p className="text-sm text-gray-500">Helena przygotuje dla Ciebie personalną interpretację</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Wysyłka wróżby</p>
                    <p className="text-sm text-gray-500">Otrzymasz szczegółową wróżbę na podany adres e-mail</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="btn-primary inline-block mr-4"
              >
                Powrót do strony głównej
              </Link>
              <Link
                href="/cennik"
                className="border border-gray-300 text-gray-700 px-6 py-4 rounded hover:bg-gray-50 transition-colors inline-block"
              >
                Zobacz inne usługi
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;
