import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Tpay hash doğrulama fonksiyonu
function verifyTpayHash(params: Record<string, string>, receivedHash: string): boolean {
  const tpayId = process.env.TPAY_ID || '';
  const tpayHash = process.env.TPAY_HASH || '';

  // Tpay hash formatı: md5(id + tr_id + amount + crc + security_code)
  const hashString = `${tpayId}${params.tr_id}${params.tr_amount}${params.tr_crc}${tpayHash}`;
  const calculatedHash = crypto.createHash('md5').update(hashString).digest('hex');

  return calculatedHash === receivedHash;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transaction_id');
    const trId = searchParams.get('tr_id');
    const trAmount = searchParams.get('tr_amount');
    const trCrc = searchParams.get('tr_crc');
    const trHash = searchParams.get('tr_hash');
    const trStatus = searchParams.get('tr_status');

    if (!transactionId && !trId) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    // Check for Tpay credentials
    if (!process.env.TPAY_ID || !process.env.TPAY_HASH) {
      return NextResponse.json(
        { error: 'Tpay not configured' },
        { status: 500 }
      );
    }

    // If we have Tpay callback parameters, verify the hash
    if (trId && trAmount && trCrc && trHash) {
      const isValid = verifyTpayHash(
        {
          tr_id: trId,
          tr_amount: trAmount,
          tr_crc: trCrc,
        },
        trHash
      );

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid hash' },
          { status: 400 }
        );
      }

      // Payment status from Tpay
      const paid = trStatus === 'TRUE' || trStatus === '1';

      return NextResponse.json({
        paid,
        status: paid ? 'paid' : 'pending',
        transaction_id: trCrc,
        tpay_transaction_id: trId,
        amount: parseFloat(trAmount),
        method: 'tpay'
      });
    }

    // If we only have transaction_id, we can't verify without Tpay API call
    // In a real implementation, you would call Tpay API to check transaction status
    return NextResponse.json({
      paid: false,
      status: 'unknown',
      transaction_id: transactionId,
      message: 'Please provide Tpay callback parameters or implement Tpay API status check'
    });

  } catch (error) {
    console.error('Error verifying Tpay payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}

// Tpay webhook handler (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Tpay webhook parameters
    const { tr_id, tr_amount, tr_crc, tr_hash, tr_status, tr_error, tr_email } = body;

    if (!tr_id || !tr_hash) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Verify hash
    const isValid = verifyTpayHash(
      {
        tr_id,
        tr_amount,
        tr_crc,
      },
      tr_hash
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid hash' },
        { status: 400 }
      );
    }

    // Payment status
    const paid = tr_status === 'TRUE' || tr_status === '1';

    if (paid) {
      console.log('Tpay payment successful:', {
        transaction_id: tr_crc,
        tpay_transaction_id: tr_id,
        amount: tr_amount,
        email: tr_email
      });

      // Here you would typically:
      // 1. Save order to database
      // 2. Send confirmation email to customer
      // 3. Trigger AI reading generation
      // 4. Notify admin about new order
    } else {
      console.log('Tpay payment failed:', {
        transaction_id: tr_crc,
        error: tr_error
      });
    }

    return NextResponse.json({ received: true, paid });

  } catch (error) {
    console.error('Error processing Tpay webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
