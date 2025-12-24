'use client';

import { handlePayment, PACKAGE_TYPES } from '@/lib/stripe';

const PricingSection = () => {
  const pricingPlans = [
    {
      questions: "1 pytanie",
      price: "14zł",
      description: "Odpowiedź w 15 minut",
      buttonText: "Zamów wróżbę"
    },
    {
      questions: "3 pytania",
      price: "29zł",
      description: "Odpowiedź w 25 minut",
      buttonText: "Zamów wróżbę"
    },
    {
      questions: "5 pytań",
      price: "39zł",
      description: "Odpowiedź w 30 minut",
      buttonText: "Zamów wróżbę"
    }
  ];

  return (
    <section className="bg-white section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
            Wróżby online
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Wybierz swój pakiet, napisz pytania w formularzu i dokonaj opłaty, a ja wyślę Ci
            odpowiedzi na maila.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="bg-white rounded-lg p-8 text-center space-y-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  {plan.questions}
                </h3>
                <div className="font-playfair text-4xl font-bold text-gray-900">
                  {plan.price}
                </div>
                <p className="text-gray-600 text-sm">
                  {plan.description}
                </p>
              </div>

              <button
                className="btn-primary w-full"
                onClick={() => {
                  const packageType = index === 0 ? PACKAGE_TYPES['1-question'] :
                                   index === 1 ? PACKAGE_TYPES['3-questions'] :
                                   PACKAGE_TYPES['5-questions'];
                  handlePayment(packageType);
                }}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
