import { NextResponse } from 'next/server';
import { getCardsByIds, type TarotCard } from '@/lib/tarotDeck';
import OpenAI from 'openai';

export async function POST(request: Request) {
  let requestData: {
    name?: string;
    birthdate?: string;
    language?: string;
    question?: string;
    cardIds?: number[];
    astrologicalContext?: string;
    spreadType?: string;
    positions?: string[];
  } = {};

  try {
    requestData = await request.json();
    
    const { 
      name, 
      birthdate, 
      language, 
      question, 
      cardIds,
      astrologicalContext,
      spreadType,
      positions 
    } = requestData;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const selectedCards = getCardsByIds(cardIds || []);

    let cardContext = '';
    if (selectedCards.length > 0 && positions) {
      cardContext = selectedCards.map((card, index) => 
        `${positions[index] || `Karta ${index + 1}`}: ${card.namePL} - ${card.meaningUpright} (Odwrócona: ${card.meaningReversed})`
      ).join('\n');
    } else if (selectedCards.length > 0) {
      cardContext = selectedCards.map(card => 
        `${card.namePL} - ${card.meaningUpright}`
      ).join(', ');
    }

    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.log('Using mock response (no valid API key)');
      const mockReading = generateMockReading(
        name || 'Droga Duszo', 
        question || 'ogólna interpretacja', 
        selectedCards, 
        language || 'PL',
        astrologicalContext,
        positions
      );
      return NextResponse.json({
        answer: mockReading,
        cards: selectedCards,
        note: 'Mock response - add OPENAI_API_KEY to .env.local for real AI'
      });
    }

    // System prompt for real fortune telling
    const systemPrompt = `Jesteś Wróżką Heleną — doświadczoną polską tarocistką z 20-letnim stażem. Prowadzisz PRAWDZIWE czytanie Tarota.

ZASADY CZYTANIA:
1. KARTY SĄ CENTRUM WRÓŻBY - każda karta powinna wpływać na całą interpretację, nie tylko być wymieniona
2. BURCU NIE INTERPRETUJ OSOBNO - użyj go jako modyfikatora energii kart (np. "Jako Lew, energia Słońca wzmacnia przesłanie tej karty...")
3. BĄDŹ KONKRETNA I DORADCZA - ludzie przychodzą po wskazówki, nie po ogólniki
4. DAWAJ REALNE RADY - na podstawie kart i pytania powiedz CO ROBIĆ, jakie decyzje podjąć
5. ŁĄCZ KARTY ZE SOBĄ - pokaż jak jedna karta wpływa na drugą, jak tworzą historię

STYL:
- Mów bezpośrednio do osoby po imieniu
- Bądź ciepła ale stanowcza w radach
- Używaj języka wróżki, ale nie bądź zbyt mistyczna - bądź praktyczna
- Odnośnie pytania/sytuacji - daj konkretną odpowiedź lub kierunek

STRUKTURA ODPOWIEDZI:
1. Krótkie przywitanie i odniesienie do pytania
2. Interpretacja kart jako JEDNA SPÓJNA HISTORIA (nie lista!)
3. Jak Twój znak/żywioł wpływa na tę sytuację (1-2 zdania wplecione)
4. KONKRETNE RADY - co zrobić, jaką decyzję podjąć, czego unikać
5. Krótkie podsumowanie i zachęta

${astrologicalContext ? `DANE ASTROLOGICZNE KLIENTA (użyj jako modyfikator, nie osobną sekcję):\n${astrologicalContext}\n` : ''}

${spreadType === '5-card-cross' ? `ROZKŁAD 5 KART (krzyż):
- Sytuacja (góra): obecny stan sprawy
- Przeszkoda (lewo): co blokuje lub utrudnia
- Świadomość (środek): co osoba wie/rozumie
- Nieświadomość (prawo): ukryte wpływy, które pomija
- Rada (dół): co powinna zrobić
` : ''}

WYBRANE KARTY:
${cardContext}

Odpowiedź 400-500 słów. Pisz po polsku.`;

    const userPrompt = `Imię: ${name}
${birthdate ? `Data urodzenia: ${birthdate}` : ''}
Pytanie/sytuacja: ${question || 'Proszę o interpretację kart i wskazówki.'}

Przeprowadź wróżbę i daj mi konkretne rady.`;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.85,
      max_tokens: 900,
    });

    const reading = completion.choices[0]?.message?.content || 'Przepraszam, nie udało się wygenerować wróżby.';

    return NextResponse.json({
      answer: reading,
      cards: selectedCards
    });

  } catch (error) {
    console.error('Error generating reading:', error);

    const { name, question, cardIds, language, astrologicalContext, positions } = requestData;
    
    const mockReading = generateMockReading(
      name || 'Droga Duszo', 
      question || 'ogólna interpretacja', 
      getCardsByIds(cardIds || []), 
      language || 'PL',
      astrologicalContext,
      positions
    );

    return NextResponse.json({
      answer: mockReading,
      cards: getCardsByIds(cardIds || []),
      note: 'Fallback response'
    });
  }
}

function generateMockReading(
  name: string, 
  question: string, 
  cards: TarotCard[], 
  language: string,
  astrologicalContext?: string,
  positions?: string[]
): string {
  // Parse zodiac info
  let zodiacSign = '';
  let element = '';
  let planet = '';
  let lifeNumber = '';
  
  if (astrologicalContext) {
    const zodiacMatch = astrologicalContext.match(/Znak zodiaku: (\w+)/);
    const elementMatch = astrologicalContext.match(/Żywioł: (\w+)/);
    const planetMatch = astrologicalContext.match(/Planeta władająca: (\w+)/);
    const numMatch = astrologicalContext.match(/Liczba numerologiczna: (\d+)/);
    
    if (zodiacMatch) zodiacSign = zodiacMatch[1];
    if (elementMatch) element = elementMatch[1];
    if (planetMatch) planet = planetMatch[1];
    if (numMatch) lifeNumber = numMatch[1];
  }

  // Element influence on advice
  const elementAdvice = 
    element === 'Ogień' ? 'Twoja ognista natura podpowiada Ci działanie — i słusznie. Ale tym razem najpierw się zatrzymaj i przemyśl' :
    element === 'Ziemia' ? 'Twoja praktyczna natura to Twój atut. Zaufaj tej ziemskiej mądrości przy podejmowaniu decyzji' :
    element === 'Powietrze' ? 'Twój analityczny umysł jest teraz Twoim sprzymierzeńcem. Ale nie analizuj w nieskończoność — czas działać' :
    element === 'Woda' ? 'Twoja intuicja jest teraz wyjątkowo silna. Zaufaj temu, co czujesz w sercu' :
    '';

  // Build card story
  let cardStory = '';
  let mainAdvice = '';
  
  if (cards.length > 0 && positions) {
    const situationCard = cards[0];
    const obstacleCard = cards[1];
    const consciousCard = cards[2];
    const unconsciousCard = cards[3];
    const adviceCard = cards[4];

    cardStory = `Widzę Twoją sytuację wyraźnie. ${situationCard?.namePL || 'Pierwsza karta'} pokazuje mi, że znajdujesz się w momencie ${situationCard?.meaningUpright.toLowerCase() || 'przemian'}. To nie przypadek, że ta karta się pojawiła.

Jednak na Twojej drodze stoi ${obstacleCard?.namePL || 'przeszkoda'} — ${obstacleCard?.meaningUpright.toLowerCase() || 'pewne wyzwanie'}. ${zodiacSign ? `Jako ${zodiacSign}, możesz mieć tendencję do ${zodiacSign === 'Baran' || zodiacSign === 'Lew' ? 'zbyt szybkiego działania' : zodiacSign === 'Rak' || zodiacSign === 'Ryby' ? 'unikania konfrontacji' : 'nadmiernego analizowania'}. Uważaj na to.` : ''}

Co ciekawe, ${consciousCard?.namePL || 'karta świadomości'} mówi mi, że w głębi duszy już wiesz, co robić. ${consciousCard?.meaningUpright || 'Masz w sobie tę wiedzę'}. Ale jest coś, czego nie widzisz — ${unconsciousCard?.namePL || 'ukryta energia'} działa w tle. ${unconsciousCard?.meaningUpright || 'To wpływa na Twoje decyzje'} bardziej niż myślisz.`;

    mainAdvice = `A teraz najważniejsze — co POWINIENEŚ/POWINNAŚ zrobić? ${adviceCard?.namePL || 'Karta rady'} jest tutaj bardzo wymowna. ${adviceCard?.meaningUpright || 'Ta energia wskazuje kierunek'}.

Konkretnie radzę Ci:
• W ciągu najbliższego tygodnia — podejmij decyzję, którą odkładasz. Karty mówią jasno, że zwłoka Ci nie służy.
• ${element ? elementAdvice : 'Zaufaj swojej intuicji, ale wesprzyj ją praktycznym planem.'}
• Unikaj ${obstacleCard?.meaningReversed?.toLowerCase() || 'powtarzania starych błędów'}. To klucz do sukcesu.
• ${planet ? `${planet} wspiera Cię teraz — wykorzystaj tę energię do działania.` : 'To dobry moment na zmiany.'}`;

  } else if (cards.length > 0) {
    const cardNames = cards.map(c => c.namePL).join(', ');
    cardStory = `Karty, które wybrałaś — ${cardNames} — układają się w wyraźny obraz. Widzę w nich historię, która dotyczy Twojego pytania.

${cards[0] ? `${cards[0].namePL} na początku mówi mi o ${cards[0].meaningUpright.toLowerCase()}. ` : ''}${cards[1] ? `W połączeniu z ${cards[1].namePL}, widzę że ${cards[1].meaningUpright.toLowerCase()}. ` : ''}${cards[2] ? `A ${cards[2].namePL} dopełnia ten obraz — ${cards[2].meaningUpright.toLowerCase()}.` : ''}`;

    mainAdvice = `Na podstawie tych kart, moja rada jest jasna:
• Nie czekaj z decyzją — karty wskazują, że czas działa na Twoją korzyść tylko jeśli zaczniesz działać.
• ${element ? elementAdvice : 'Połącz intuicję z praktycznym działaniem.'}
• Pamiętaj o tym, co powiedziała Ci ${cards[cards.length - 1]?.namePL || 'ostatnia karta'} — to klucz.`;
  } else {
    cardStory = 'Karty odzwierciedlają Twoją energię i pytanie.';
    mainAdvice = 'Zaufaj swojej intuicji i podejmij działanie.';
  }

  if (language === 'EN') {
    return `Dear ${name},

Thank you for your trust. I see your question clearly, and the cards have spoken.

${cardStory}

${mainAdvice}

Remember — the cards show possibilities, but YOU make the decisions. Trust yourself.

With guidance and light,
Helena 🌙`;
  }

  return `${name},

Dziękuję za zaufanie. Widzę Twoje pytanie i karty już do mnie mówią.

${cardStory}

${mainAdvice}

${lifeNumber ? `\nTwoja liczba życia ${lifeNumber} podpowiada mi jeszcze jedno — masz w sobie więcej siły niż myślisz. Użyj jej teraz.` : ''}

Pamiętaj — karty pokazują możliwości, ale to TY podejmujesz decyzje. Wskazałam Ci kierunek, teraz ruszaj.

Z ciepłem i jasnością,
Wróżka Helena 🌙`;
}
