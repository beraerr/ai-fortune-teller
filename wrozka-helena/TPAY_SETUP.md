# 💳 Tpay Entegrasyonu - Kurulum Rehberi

Bu rehber, Tpay ödeme sistemini projenize entegre etmek için gereken adımları içerir.

## 📋 Gereksinimler

- ✅ Tpay hesabı ([https://www.tpay.com](https://www.tpay.com))
- ✅ Tpay API kimlik bilgileri (ID, kod, hash)
- ✅ Revolut hesabı (para aktarımı için)

## 🚀 Adım 1: Tpay Hesabı Oluşturma

1. **Tpay web sitesine gidin**: [https://www.tpay.com](https://www.tpay.com)
2. **"Zarejestruj się"** (Kayıt ol) butonuna tıklayın
3. **İşletme bilgilerinizi girin**:
   - İşletme adı
   - NIP (Vergi numarası)
   - Adres bilgileri
   - Banka hesap bilgileri
4. **Hesabınızı doğrulayın** (Tpay gerekli belgeleri isteyebilir)

## 🔑 Adım 2: Tpay API Kimlik Bilgilerini Alma

1. **Tpay Panel'e giriş yapın**
2. **"Ustawienia"** (Ayarlar) → **"API"** bölümüne gidin
3. **API kimlik bilgilerinizi not edin**:
   - **ID**: Tpay hesap ID'niz
   - **Kod**: API kodunuz
   - **Hash**: Güvenlik hash'iniz
4. **IP adresinizi beyaz listeye ekleyin** (güvenlik için)

## 🔧 Adım 3: Projeye Tpay Entegrasyonu

Kod örnekleri `src/app/api/tpay/` klasöründe bulunmaktadır.

### Gerekli Paketler

```bash
npm install axios crypto
```

### Environment Variables

`.env` dosyanıza ekleyin:

```env
TPAY_ID=your_tpay_id
TPAY_CODE=your_tpay_code
TPAY_HASH=your_tpay_hash
TPAY_API_URL=https://secure.tpay.com/api/gw
```

## 💰 Adım 4: Revolut'a Para Aktarımı

Tpay'den Revolut'a para aktarımı için iki seçenek:

### Seçenek A: Tpay'den Banka Hesabına, Sonra Revolut'a

1. **Tpay Panel → "Wypłaty"** (Para çekme) bölümüne gidin
2. **Revolut IBAN'ınızı ekleyin**
3. **Otomatik transfer ayarlarını yapın** (günlük/haftalık)
4. Para Tpay'den Revolut'a otomatik aktarılır

### Seçenek B: Manuel Transfer

1. Tpay Panel'den manuel olarak para çekme işlemi yapın
2. Revolut IBAN'ınızı seçin
3. Transfer işlemini onaylayın

## 📝 Tpay API Kullanımı

### Payment Link Oluşturma

```typescript
// API endpoint: /api/tpay/create-payment
POST /api/tpay/create-payment
{
  "amount": 14.00,
  "description": "Wróżka Helena - 1 pytanie",
  "returnUrl": "https://yourdomain.com/dziekujemy",
  "email": "customer@example.com"
}
```

### Ödeme Durumu Kontrolü

```typescript
// API endpoint: /api/tpay/verify-payment
GET /api/tpay/verify-payment?transaction_id=xxx
```

## ⚠️ Önemli Notlar

### Ücretler

- **Tpay ücretleri**: Genellikle %1.2 - 1.9 (işlem başına)
- **Revolut'a transfer**: SEPA transferleri genellikle ücretsiz
- **Minimum tutar**: Tpay minimum tutar gerektirebilir

### Güvenlik

- **Hash doğrulama**: Tüm isteklerde hash kontrolü yapılmalı
- **IP whitelist**: Tpay panel'de IP adresinizi ekleyin
- **HTTPS**: Mutlaka HTTPS kullanın

### BLIK Desteği

- Tpay BLIK ödemelerini destekler
- Müşteriler Tpay sayfasında BLIK seçeneğini görebilir

## 🔄 Stripe vs Tpay Karşılaştırması

| Özellik | Stripe | Tpay |
|---------|--------|------|
| BLIK desteği | ✅ | ✅ |
| Kurulum kolaylığı | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Ücretler | ~%1.4 + 1 PLN | ~%1.2-1.9 |
| Revolut entegrasyonu | ✅ Otomatik | ⚠️ Manuel |
| API dokümantasyonu | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Uluslararası destek | ✅ | ⚠️ Sadece Polonya |

## 🆘 Sorun Giderme

### Tpay API hatası?

1. **Hash kontrolü**: Hash hesaplamasını kontrol edin
2. **IP whitelist**: IP adresinizin ekli olduğundan emin olun
3. **API kimlik bilgileri**: ID, kod ve hash'in doğru olduğunu kontrol edin

### Para Revolut'a gelmedi?

1. **Tpay Panel'de transfer durumunu kontrol edin**
2. **Revolut'ta işlem geçmişine bakın**
3. **IBAN'ın doğru olduğundan emin olun**

## 📞 Destek

- **Tpay Destek**: [https://www.tpay.com/kontakt](https://www.tpay.com/kontakt)
- **Tpay API Dokümantasyonu**: Tpay Panel → API → Dokumentacja

---

**Not**: Tpay entegrasyonu için kod örnekleri `src/app/api/tpay/` klasöründe bulunmaktadır.
