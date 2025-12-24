const WorkshopSection = () => {
  return (
    <section className="bg-white section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-8 h-8 mx-auto mb-6">
            <img
              src="/images/icons/sparkle.png"
              alt="Sparkle icon"
              className="w-full h-full object-contain"
            />
          </div>

          <h2 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
            Mój magiczny warsztat
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Holistyczne podejście pozwala mi uzyskać pełniejszy obraz Twojej sytuacji i udzielić
            bardziej trafnych wskazówek. Czerpiąc z różnych dziedzin ezoterycznych, jestem w stanie
            odpowiedzieć na Twoje pytania w sposób dogłębny i wielowymiarowy.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Tarot */}
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto mb-6">
              <img
                src="/images/icons/tarot_tarot.jpg"
                alt="Tarot"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">
              Tarot
            </h3>

            <p className="text-gray-600 leading-relaxed text-sm">
              Karty Tarota to niezwykłe narzędzie, które przybliży Cię do zrozumienia Twojej
              przeszłości, teraźniejszości i przyszłości. Dzięki mojemu intuicyjnemu połączeniu z tą
              starożytną sztuką, otrzymasz ode mnie odpowiedzi na nawet najtrudniejsze dylematy
              życiowe i jasne wskazówki, jak kształtować swoją ścieżkę.
            </p>
          </div>

          {/* Astrologia */}
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto mb-6">
              <img
                src="/images/icons/astrologia.jpg"
                alt="Astrologia"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">
              Astrologia
            </h3>

            <p className="text-gray-600 leading-relaxed text-sm">
              Pomogę Ci poznać swój potencjał i życiowe wyzwania. Astrologia to starożytna nauka,
              która bada wpływ gwiazd i planet na nasze życie. Analiza Twojego horoskopu
              urodzeniowego ujawni Twoje wrodzone talenty, predyspozycje, wyzwania i cele życiowe.
            </p>
          </div>

          {/* Numerologia */}
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto mb-6">
              <img
                src="/images/icons/numerologia.jpg"
                alt="Numerologia"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">
              Numerologia
            </h3>

            <p className="text-gray-600 leading-relaxed text-sm">
              Odkryj znaczenie liczb w Twoim życiu. Numerologia to nauka o wibracjach liczb
              i ich wpływie na nasze życie. Każda litera i cyfra posiada swoją unikalną energię,
              która może oddziaływać na nasze osobowości, relacje, wybory i przeznaczenie.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopSection;
