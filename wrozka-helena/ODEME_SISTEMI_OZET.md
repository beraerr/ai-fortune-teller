# 💳 Ödeme Sistemi Kurulum Özeti

Bu dosya, projenizdeki ödeme sistemleri ve Revolut entegrasyonu hakkında özet bilgi içerir.

## 📊 Mevcut Durum

Projenizde **iki ödeme sistemi** seçeneği mevcuttur:

1. **Stripe** (Zaten kurulu ✅)
2. **Tpay** (Yeni eklendi ✅)

## 🎯 Ne Yapmanız Gerekiyor?

### Seçenek 1: Stripe ile Devam Etmek (ÖNERİLEN)

Stripe zaten kurulu ve BLIK desteği kodda mevcut. Sadece şunları yapmanız gerekiyor:

#### 1. Stripe Dashboard'da BLIK'i Aktifleştirin

1. [Stripe Dashboard](https://dashboard.stripe.com) → Settings → Payment Methods
2. "Bank redirects" bölümünde **BLIK**'i açın
3. Hesabınızın Polonya'da kayıtlı olduğundan emin olun

#### 2. Revolut Hesabınızı Stripe'a Bağlayın

Detaylı adımlar için: **`REVOLUT_SETUP.md`** dosyasına bakın

Kısaca:
- Stripe Dashboard → Settings → Bank accounts
- Revolut IBAN'ınızı ekleyin
- Test ödemelerini doğrulayın
- Payout ayarlarını yapın (günlük otomatik transfer)

#### 3. Environment Variables

`.env` dosyanızda şunlar olmalı:

```env
STRIPE_SECRET_KEY=sk_test_... veya sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_test_... veya pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Seçenek 2: Tpay Kullanmak

Tpay entegrasyonu kodda hazır, ancak yapılandırma gerekiyor:

#### 1. Tpay Hesabı Oluşturun

1. [Tpay.com](https://www.tpay.com) → Kayıt olun
2. İşletme bilgilerinizi girin
3. Hesabınızı doğrulayın

#### 2. Tpay API Kimlik Bilgilerini Alın

1. Tpay Panel → Ustawienia → API
2. ID, Kod ve Hash değerlerini not edin

#### 3. Environment Variables

`.env` dosyanıza ekleyin:

```env
TPAY_ID=your_tpay_id
TPAY_CODE=your_tpay_code
TPAY_HASH=your_tpay_hash
TPAY_API_URL=https://secure.tpay.com/api/gw
```

#### 4. Revolut'a Para Aktarımı

Tpay Panel → Wypłaty (Para çekme) → Revolut IBAN'ınızı ekleyin

Detaylı adımlar için: **`TPAY_SETUP.md`** dosyasına bakın

## 🔄 Stripe vs Tpay Karşılaştırması

| Özellik | Stripe | Tpay |
|---------|--------|------|
| **Kurulum** | ⭐⭐⭐⭐⭐ Çok kolay | ⭐⭐⭐ Orta |
| **BLIK Desteği** | ✅ Var | ✅ Var |
| **Revolut Entegrasyonu** | ✅ Otomatik payout | ⚠️ Manuel transfer |
| **Ücretler** | ~%1.4 + 1 PLN | ~%1.2-1.9 |
| **API Dokümantasyon** | ⭐⭐⭐⭐⭐ Mükemmel | ⭐⭐⭐ İyi |
| **Uluslararası** | ✅ 40+ ülke | ⚠️ Sadece Polonya |
| **Kod Durumu** | ✅ Tam entegre | ✅ Hazır (yapılandırma gerekli) |

## 💡 Öneri

**Stripe ile devam etmenizi öneriyoruz** çünkü:

1. ✅ Zaten kurulu ve çalışıyor
2. ✅ Revolut'a otomatik payout (günlük transfer)
3. ✅ Daha iyi API dokümantasyonu
4. ✅ Uluslararası destek
5. ✅ BLIK zaten kodda var, sadece aktifleştirmek gerekiyor

## 📝 Yapılacaklar Listesi

### Stripe ile Devam Ederseniz:

- [ ] Stripe Dashboard'da BLIK'i aktifleştir
- [ ] Revolut IBAN'ını Stripe'a ekle
- [ ] Test ödemelerini doğrula
- [ ] Payout ayarlarını yap (günlük otomatik)
- [ ] Webhook'u yapılandır (production için)
- [ ] Test ödemesi yap ve Revolut'a geldiğini kontrol et

### Tpay Kullanırsanız:

- [ ] Tpay hesabı oluştur
- [ ] API kimlik bilgilerini al
- [ ] `.env` dosyasına Tpay değişkenlerini ekle
- [ ] Tpay webhook URL'ini yapılandır
- [ ] Revolut IBAN'ını Tpay'e ekle
- [ ] Test ödemesi yap

## 📚 Detaylı Dokümantasyon

- **Stripe + Revolut**: `REVOLUT_SETUP.md`
- **Tpay Kurulumu**: `TPAY_SETUP.md`
- **BLIK Kurulumu**: `BLIK_SETUP.md`
- **Genel Ödeme**: `PAYMENT_SETUP.md`

## 🆘 Yardım

Sorun yaşarsanız:

1. İlgili `.md` dosyalarına bakın
2. Stripe/Tpay destek ekiplerine başvurun
3. Kod yorumlarını kontrol edin

---

**Sonuç**: Stripe ile devam etmek daha kolay ve hızlı olacaktır. Sadece BLIK'i aktifleştirip Revolut'u bağlamanız yeterli! 🚀
