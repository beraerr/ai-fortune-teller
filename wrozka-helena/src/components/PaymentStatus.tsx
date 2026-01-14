'use client';

import { useEffect, useState } from 'react';
import Stripe from 'stripe';

interface PaymentStatusProps {
  sessionId?: string;
}

const PaymentStatus = ({ sessionId }: PaymentStatusProps) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Weryfikowanie płatności...');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      setMessage('Brak identyfikatora sesji płatności.');
      return;
    }

    // Verify payment status
    fetch(`/api/verify-payment?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.paid) {
          setStatus('success');
          setMessage('Płatność została pomyślnie zrealizowana!');
        } else {
          setStatus('error');
          setMessage('Płatność nie została jeszcze potwierdzona. Sprawdź swój e-mail.');
        }
      })
      .catch((error) => {
        console.error('Error verifying payment:', error);
        setStatus('error');
        setMessage('Wystąpił błąd podczas weryfikacji płatności.');
      });
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <p className="text-gray-600 leading-relaxed mb-8">
        {message}
      </p>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <p className="text-yellow-800">{message}</p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
      <p className="text-green-800 font-medium">{message}</p>
    </div>
  );
};

export default PaymentStatus;
