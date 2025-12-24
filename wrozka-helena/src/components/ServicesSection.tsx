const ServicesSection = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: '#2d3748' }}>
      <div className="container-max mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-4">
            <img
              src="/images/icons/shiny_star.png"
              alt="Shiny star icon"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="font-playfair text-2xl lg:text-3xl mb-4 text-white">
            W czym mogę Ci pomóc?
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {/* Love & Relationships */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-white">
              Miłość i relacje
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Jeśli tęsknisz za prawdziwą bliskością i harmonią w swoim życiu,
              jestem tutaj, aby Ci pomóc. Przyciągnij miłość, na którą zasługujesz.
            </p>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Kiedy spotkam miłość swojego życia?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Czy mój związek przetrwa kryzys?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Jak przyciągnąć do siebie odpowiedniego partnera?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Czy mój partner mnie kocha?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Czy mój były partner wróci do mnie?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Jak mogę naprawić relację z bliską mi osobą?
              </li>
            </ul>
          </div>

          {/* Career & Finance */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-white">
              Kariera i finanse
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Pomogę Ci odkryć Twoje prawdziwe talenty i potencjał,
              abyś mogła cieszyć się spełnieniem w pracy i życiu osobistym.
            </p>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Czy mój obecny zawód jest zgodny z moim przeznaczeniem?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Czy zmiana pracy teraz to dobry pomysł?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Jak przyciągnąć obfitość i dobrobyt do mojego życia?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Kiedy mogę spodziewać się większych zarobków?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Czy moja firma odniesie sukces?
              </li>
            </ul>
          </div>

          {/* Health & Spiritual Development */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-white">
              Zdrowie i rozwój duchowy
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Zadbaj o swoje zdrowie i równowagę wewnętrzną. Odkryj nieograniczone
              źródło siły i spokoju, które zawsze było w Tobie.
            </p>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Jak mogę poprawić swoje zdrowie fizyczne i psychiczne?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                W jaki sposób mogę znaleźć większą równowagę między ciałem a duchem?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Jak radzić sobie ze stresem i napięciem w codziennym życiu?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Czy wyzdrowieję z choroby?
              </li>
            </ul>
          </div>

          {/* Life Choices & Future */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-white">
              Życiowe wybory i przyszłość
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Podejmuj decyzje z pewnością siebie i jasnością. Z moim przewodnictwem
              stworzysz przyszłość, o jakiej zawsze marzyłaś.
            </p>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Jakie decyzje powinnam podjąć?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Co mnie czeka w przyszłości?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Czy powinnam dać partnerowi jeszcze jedną szansę?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Czy uda mi się osiągnąć swoje cele?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Jak poradzić sobie z trudną sytuacją lub emocjami?
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Jaki jest cel mojego życia?
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8">
          <button className="bg-white text-black px-6 py-3 rounded-xl font-playfair font-medium hover:bg-gray-100 transition-colors">
            Zamów wróżbę
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
