'use client';

import { handlePayment, PACKAGE_TYPES } from '@/lib/stripe';

export default function TestPayment() {
  const packages = [
    { type: PACKAGE_TYPES['1-question'], name: '1 pytanie - 14zł' },
    { type: PACKAGE_TYPES['3-questions'], name: '3 pytania - 29zł' },
    { type: PACKAGE_TYPES['5-questions'], name: '5 pytań - 39zł' },
    { type: PACKAGE_TYPES['3-cards'], name: '3 Karty - 50zł' },
    { type: PACKAGE_TYPES['5-cards'], name: '5 Kart - 80zł' },
    { type: PACKAGE_TYPES['love-tarot'], name: 'Tarot Miłosny - 90zł' },
    { type: PACKAGE_TYPES['celtic-cross'], name: 'Krzyż Celtycki - 200zł' },
    { type: PACKAGE_TYPES['yearly'], name: 'Tarot Roczny - 240zł' },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Test Payment Page</h1>
        <p className="text-gray-600 mb-8">
          Bu sayfa ödeme butonlarını test etmek için. Her buton Stripe checkout'a yönlendirecek.
        </p>
        
        <div className="space-y-4">
          {packages.map((pkg) => (
            <button
              key={pkg.type}
              onClick={() => handlePayment(pkg.type)}
              className="w-full bg-gray-800 text-white px-6 py-4 rounded-lg hover:bg-gray-700 transition-colors text-left"
            >
              {pkg.name}
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Not:</strong> Ödeme yapmak için Stripe environment variables'ların ayarlanmış olması gerekiyor.
            Test modunda Stripe test kartı kullanabilirsiniz: 4242 4242 4242 4242
          </p>
        </div>
      </div>
    </div>
  );
}
