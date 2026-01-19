import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Pricing packages matching the website
const PRICING_PACKAGES = {
  '1-question': { price: 14.00, name: '1 pytanie', description: 'Odpowiedź w 15 minut' },
  '3-questions': { price: 29.00, name: '3 pytania', description: 'Odpowiedź w 25 minut' },
  '5-questions': { price: 39.00, name: '5 pytań', description: 'Odpowiedź w 30 minut' },
  '3-cards': { price: 50.00, name: '3 Karty', description: 'Odpowiedź do 30m' },
  '5-cards': { price: 80.00, name: '5 Kart', description: 'Odpowiedź do 1h' },
  'love-tarot': { price: 90.00, name: 'Tarot Miłosny', description: 'Odpowiedź do 2h' },
  'celtic-cross': { price: 200.00, name: 'Krzyż Celtycki', description: 'Odpowiedź do 12h' },
  'yearly': { price: 240.00, name: 'Tarot Roczny', description: 'Odpowiedź do 24h' }
};

// Tpay hash hesaplama fonksiyonu
function calculateTpayHash(params: Record<string, string | number>): string {
  const tpayId = process.env.TPAY_ID || '';
  const tpayCode = process.env.TPAY_CODE || '';
  const tpayHash = process.env.TPAY_HASH || '';

  // Tpay hash formatı: md5(id + amount + crc + security_code)
  const hashString = `${tpayId}${params.amount}${params.crc}${tpayHash}`;
  return crypto.createHash('md5').update(hashString).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { packageType, customerEmail, customerName } = await request.json();

    // Validate package type
    if (!PRICING_PACKAGES[packageType as keyof typeof PRICING_PACKAGES]) {
      return NextResponse.json(
        { error: 'Invalid package type' },
        { status: 400 }
      );
    }

    // Check for Tpay credentials
    if (!process.env.TPAY_ID || !process.env.TPAY_CODE || !process.env.TPAY_HASH) {
      return NextResponse.json(
        { error: 'Tpay not configured. Please set TPAY_ID, TPAY_CODE, and TPAY_HASH in environment variables.' },
        { status: 500 }
      );
    }

    const package_info = PRICING_PACKAGES[packageType as keyof typeof PRICING_PACKAGES];
    const amount = package_info.price;
    const tpayId = process.env.TPAY_ID;
    const tpayCode = process.env.TPAY_CODE;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // Generate unique transaction ID (crc)
    const crc = `WR${Date.now()}${Math.random().toString(36).substring(7)}`;
    
    // Calculate hash
    const hash = calculateTpayHash({
      id: tpayId,
      amount: amount.toFixed(2),
      crc: crc,
    });

    // Tpay API parameters
    const tpayParams = {
      id: tpayId,
      amount: amount.toFixed(2),
      description: `Wróżka Helena - ${package_info.name}`,
      crc: crc,
      md5sum: hash,
      return_url: `${baseUrl}/dziekujemy?payment_method=tpay&transaction_id=${crc}`,
      return_error_url: `${baseUrl}/cennik?error=tpay_error`,
      email: customerEmail || '',
      name: customerName || '',
      group: '150', // BLIK group ID (Tpay'de BLIK için)
      online: '1', // Enable online payments
      accept_tos: '1',
    };

    // Tpay API URL
    const tpayApiUrl = process.env.TPAY_API_URL || 'https://secure.tpay.com/api/gw';
    
    // Create payment link
    // Note: Tpay API'yi çağırmak yerine, form gönderimi yapabilirsiniz
    // Veya Tpay'in payment link API'sini kullanabilirsiniz
    
    // Bu örnekte, Tpay form URL'ini döndürüyoruz
    // Gerçek implementasyonda Tpay API'sini çağırmanız gerekebilir
    const paymentUrl = `${tpayApiUrl}/${tpayCode}/transaction?${new URLSearchParams(
      Object.entries(tpayParams).map(([key, value]) => [key, String(value)])
    ).toString()}`;

    return NextResponse.json({ 
      url: paymentUrl,
      transaction_id: crc,
      amount: amount,
      method: 'tpay'
    });

  } catch (error) {
    console.error('Error creating Tpay payment:', error);
    return NextResponse.json(
      { error: 'Failed to create payment link' },
      { status: 500 }
    );
  }
}
