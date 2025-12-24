// Seed data for testing zodiac/astrology features

export interface UserProfile {
  id: string;
  name: string;
  surname: string;
  email: string;
  birthDate: string; // YYYY-MM-DD format
  zodiacSign: ZodiacSign;
  numerologyNumber: number;
  element: Element;
  rulingPlanet: string;
}

export type ZodiacSign = 
  | 'Baran' | 'Byk' | 'Bliźnięta' | 'Rak' 
  | 'Lew' | 'Panna' | 'Waga' | 'Skorpion' 
  | 'Strzelec' | 'Koziorożec' | 'Wodnik' | 'Ryby';

export type Element = 'Ogień' | 'Ziemia' | 'Powietrze' | 'Woda';

export interface ZodiacInfo {
  sign: ZodiacSign;
  dateRange: string;
  element: Element;
  rulingPlanet: string;
  traits: string[];
  compatibility: ZodiacSign[];
  luckyNumbers: number[];
  luckyColors: string[];
}

// Zodiac data
export const zodiacData: Record<ZodiacSign, ZodiacInfo> = {
  'Baran': {
    sign: 'Baran',
    dateRange: '21.03 - 19.04',
    element: 'Ogień',
    rulingPlanet: 'Mars',
    traits: ['odważny', 'energiczny', 'pewny siebie', 'impulsywny'],
    compatibility: ['Lew', 'Strzelec', 'Bliźnięta', 'Wodnik'],
    luckyNumbers: [1, 8, 17],
    luckyColors: ['czerwony', 'pomarańczowy']
  },
  'Byk': {
    sign: 'Byk',
    dateRange: '20.04 - 20.05',
    element: 'Ziemia',
    rulingPlanet: 'Wenus',
    traits: ['cierpliwy', 'praktyczny', 'lojalny', 'uparty'],
    compatibility: ['Panna', 'Koziorożec', 'Rak', 'Ryby'],
    luckyNumbers: [2, 6, 9, 12],
    luckyColors: ['zielony', 'różowy']
  },
  'Bliźnięta': {
    sign: 'Bliźnięta',
    dateRange: '21.05 - 20.06',
    element: 'Powietrze',
    rulingPlanet: 'Merkury',
    traits: ['komunikatywny', 'ciekawy', 'wszechstronny', 'niezdecydowany'],
    compatibility: ['Waga', 'Wodnik', 'Baran', 'Lew'],
    luckyNumbers: [3, 5, 7],
    luckyColors: ['żółty', 'jasnoniebieski']
  },
  'Rak': {
    sign: 'Rak',
    dateRange: '21.06 - 22.07',
    element: 'Woda',
    rulingPlanet: 'Księżyc',
    traits: ['opiekuńczy', 'intuicyjny', 'emocjonalny', 'wrażliwy'],
    compatibility: ['Skorpion', 'Ryby', 'Byk', 'Panna'],
    luckyNumbers: [2, 7, 11],
    luckyColors: ['biały', 'srebrny']
  },
  'Lew': {
    sign: 'Lew',
    dateRange: '23.07 - 22.08',
    element: 'Ogień',
    rulingPlanet: 'Słońce',
    traits: ['charyzmatyczny', 'pewny siebie', 'hojny', 'dumny'],
    compatibility: ['Baran', 'Strzelec', 'Bliźnięta', 'Waga'],
    luckyNumbers: [1, 4, 10],
    luckyColors: ['złoty', 'pomarańczowy']
  },
  'Panna': {
    sign: 'Panna',
    dateRange: '23.08 - 22.09',
    element: 'Ziemia',
    rulingPlanet: 'Merkury',
    traits: ['analityczny', 'pracowity', 'skromny', 'perfekcjonista'],
    compatibility: ['Byk', 'Koziorożec', 'Rak', 'Skorpion'],
    luckyNumbers: [5, 14, 23],
    luckyColors: ['zielony', 'brązowy']
  },
  'Waga': {
    sign: 'Waga',
    dateRange: '23.09 - 22.10',
    element: 'Powietrze',
    rulingPlanet: 'Wenus',
    traits: ['dyplomatyczny', 'romantyczny', 'sprawiedliwy', 'niezdecydowany'],
    compatibility: ['Bliźnięta', 'Wodnik', 'Lew', 'Strzelec'],
    luckyNumbers: [6, 15, 24],
    luckyColors: ['niebieski', 'różowy']
  },
  'Skorpion': {
    sign: 'Skorpion',
    dateRange: '23.10 - 21.11',
    element: 'Woda',
    rulingPlanet: 'Pluton',
    traits: ['intensywny', 'tajemniczy', 'lojalny', 'zazdrosny'],
    compatibility: ['Rak', 'Ryby', 'Panna', 'Koziorożec'],
    luckyNumbers: [8, 11, 18],
    luckyColors: ['czarny', 'bordowy']
  },
  'Strzelec': {
    sign: 'Strzelec',
    dateRange: '22.11 - 21.12',
    element: 'Ogień',
    rulingPlanet: 'Jowisz',
    traits: ['optymistyczny', 'wolny duch', 'filozoficzny', 'niecierpliwy'],
    compatibility: ['Baran', 'Lew', 'Waga', 'Wodnik'],
    luckyNumbers: [3, 7, 9],
    luckyColors: ['fioletowy', 'niebieski']
  },
  'Koziorożec': {
    sign: 'Koziorożec',
    dateRange: '22.12 - 19.01',
    element: 'Ziemia',
    rulingPlanet: 'Saturn',
    traits: ['ambitny', 'odpowiedzialny', 'zdyscyplinowany', 'pesymistyczny'],
    compatibility: ['Byk', 'Panna', 'Skorpion', 'Ryby'],
    luckyNumbers: [4, 8, 13],
    luckyColors: ['brązowy', 'czarny']
  },
  'Wodnik': {
    sign: 'Wodnik',
    dateRange: '20.01 - 18.02',
    element: 'Powietrze',
    rulingPlanet: 'Uran',
    traits: ['oryginalny', 'niezależny', 'humanitarny', 'zdystansowany'],
    compatibility: ['Bliźnięta', 'Waga', 'Baran', 'Strzelec'],
    luckyNumbers: [4, 7, 11],
    luckyColors: ['niebieski', 'turkusowy']
  },
  'Ryby': {
    sign: 'Ryby',
    dateRange: '19.02 - 20.03',
    element: 'Woda',
    rulingPlanet: 'Neptun',
    traits: ['intuicyjny', 'empatyczny', 'artystyczny', 'uciekający od rzeczywistości'],
    compatibility: ['Rak', 'Skorpion', 'Byk', 'Koziorożec'],
    luckyNumbers: [3, 9, 12],
    luckyColors: ['morski', 'fioletowy']
  }
};

// Calculate zodiac sign from birthdate
export function getZodiacSign(birthDate: string): ZodiacSign {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1; // 0-indexed
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Baran';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Byk';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Bliźnięta';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Rak';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Lew';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Panna';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Waga';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Skorpion';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Strzelec';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Koziorożec';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Wodnik';
  return 'Ryby';
}

// Calculate numerology life path number
export function calculateNumerology(birthDate: string): number {
  const digits = birthDate.replace(/-/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  
  // Keep reducing until single digit (except master numbers 11, 22, 33)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  
  return sum;
}

// Sample users for testing
export const sampleUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Anna',
    surname: 'Kowalska',
    email: 'anna@example.com',
    birthDate: '1990-03-25',
    zodiacSign: 'Baran',
    numerologyNumber: 2,
    element: 'Ogień',
    rulingPlanet: 'Mars'
  },
  {
    id: '2',
    name: 'Michał',
    surname: 'Nowak',
    email: 'michal@example.com',
    birthDate: '1985-07-15',
    zodiacSign: 'Rak',
    numerologyNumber: 9,
    element: 'Woda',
    rulingPlanet: 'Księżyc'
  },
  {
    id: '3',
    name: 'Katarzyna',
    surname: 'Wiśniewska',
    email: 'kasia@example.com',
    birthDate: '1992-11-08',
    zodiacSign: 'Skorpion',
    numerologyNumber: 4,
    element: 'Woda',
    rulingPlanet: 'Pluton'
  },
  {
    id: '4',
    name: 'Piotr',
    surname: 'Zieliński',
    email: 'piotr@example.com',
    birthDate: '1988-02-14',
    zodiacSign: 'Wodnik',
    numerologyNumber: 6,
    element: 'Powietrze',
    rulingPlanet: 'Uran'
  },
  {
    id: '5',
    name: 'Magdalena',
    surname: 'Dąbrowska',
    email: 'magda@example.com',
    birthDate: '1995-09-22',
    zodiacSign: 'Panna',
    numerologyNumber: 1,
    element: 'Ziemia',
    rulingPlanet: 'Merkury'
  }
];

// Create a complete user profile from basic info
export function createUserProfile(
  name: string, 
  surname: string, 
  email: string, 
  birthDate: string
): UserProfile {
  const zodiacSign = getZodiacSign(birthDate);
  const zodiacInfo = zodiacData[zodiacSign];
  
  return {
    id: Date.now().toString(),
    name,
    surname,
    email,
    birthDate,
    zodiacSign,
    numerologyNumber: calculateNumerology(birthDate),
    element: zodiacInfo.element,
    rulingPlanet: zodiacInfo.rulingPlanet
  };
}

// Get astrological insight text for AI prompt
export function getAstrologicalContext(profile: UserProfile): string {
  const zodiacInfo = zodiacData[profile.zodiacSign];
  
  return `
Dane astrologiczne klienta:
- Imię: ${profile.name}
- Znak zodiaku: ${profile.zodiacSign} (${zodiacInfo.dateRange})
- Żywioł: ${profile.element}
- Planeta władająca: ${profile.rulingPlanet}
- Liczba numerologiczna: ${profile.numerologyNumber}
- Cechy charakteru: ${zodiacInfo.traits.join(', ')}
- Zgodność z: ${zodiacInfo.compatibility.join(', ')}
- Szczęśliwe liczby: ${zodiacInfo.luckyNumbers.join(', ')}
- Szczęśliwe kolory: ${zodiacInfo.luckyColors.join(', ')}
`.trim();
}

