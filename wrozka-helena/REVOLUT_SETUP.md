# 💰 Revolut Hesabına Para Aktarımı - Stripe Payout Kurulumu

Bu rehber, Stripe üzerinden gelen ödemeleri Revolut hesabınıza otomatik olarak aktarmak için gereken adımları içerir.

## 📋 Gereksinimler

- ✅ Stripe hesabı (Polonya'da kayıtlı)
- ✅ Revolut hesabı (kişisel veya işletme)
- ✅ Revolut IBAN numaranız
- ✅ Revolut BIC/SWIFT kodu

## 🚀 Adım 1: Revolut IBAN ve BIC Bilgilerinizi Bulun

1. **Revolut uygulamasını açın**
2. **Hesabınıza gidin** (EUR veya PLN hesabı)
3. **"Account details"** veya **"Hesap Detayları"** seçeneğine tıklayın
4. Şu bilgileri not edin:
   - **IBAN**: Örnek: `LT49 3250 0116 6178 7618`
   - **BIC/SWIFT**: Genellikle `REVOLT21` (Revolut Bank için)
   - **Hesap sahibi adı**: DENISS EROLU

## 🔧 Adım 2: Stripe Dashboard'da Banka Hesabı Ekleyin

1. **Stripe Dashboard'a giriş yapın**: [https://dashboard.stripe.com](https://dashboard.stripe.com)

2. **Settings → Bank accounts and scheduling** bölümüne gidin:
   - [https://dashboard.stripe.com/settings/bank_accounts](https://dashboard.stripe.com/settings/bank_accounts)

3. **"Add bank account"** butonuna tıklayın

4. **Revolut hesap bilgilerinizi girin**:
   - **Account holder name**: Revolut'ta görünen tam adınız
   - **IBAN**: Revolut IBAN numaranız (boşluk olmadan: `LT123456789012345678`)
   - **BIC/SWIFT**: `REVOLT21` (veya Revolut'ta gösterilen BIC)
   - **Country**: Revolut hesabınızın ülkesi (genellikle Litvanya `LT`)

5. **"Add bank account"** butonuna tıklayın

## ✅ Adım 3: Hesap Doğrulama

Stripe, Revolut hesabınızı doğrulamak için **2 küçük test ödemesi** gönderecek:

1. **1-2 iş günü içinde** Revolut hesabınıza 2 küçük tutar gelecek (genellikle €0.01 veya benzeri)
2. **Stripe Dashboard'a geri dönün**
3. **"Verify bank account"** bölümünde bu 2 tutarı girin
4. Stripe hesabınızı doğrular ve aktif hale getirir

## ⚙️ Adım 4: Payout (Para Çekme) Ayarları

1. **Settings → Bank accounts and scheduling** bölümünde
2. **"Payout schedule"** bölümüne gidin
3. **Payout sıklığını seçin**:
   - **Daily (Günlük)**: Her gün otomatik transfer
   - **Weekly (Haftalık)**: Haftada bir kez (belirli bir gün)
   - **Monthly (Aylık)**: Ayda bir kez
   - **Manual (Manuel)**: İstediğiniz zaman manuel transfer

4. **Önerilen**: **Daily (Günlük)** - Her gün gelen paralar otomatik olarak Revolut'a aktarılır

## 💡 Önemli Notlar

### Para Aktarım Süresi

- **Stripe'dan Revolut'a transfer**: 2-7 iş günü
- **BLIK ödemeleri**: Anında Stripe'a gelir, sonra Revolut'a aktarılır
- **Kart ödemeleri**: 1-2 gün sonra Stripe'a gelir, sonra Revolut'a aktarılır

### Ücretler

- **Stripe ücretleri**: Her işlem için ~%1.4 + 1 PLN (Polonya için)
- **Revolut'a transfer**: **ÜCRETSİZ** (SEPA transferleri ücretsiz)
- **Döviz kuru**: Stripe PLN'den EUR'ya çevirir (küçük bir spread olabilir)

### Minimum Payout Tutarı

- Stripe genellikle minimum tutar gerektirmez
- Ancak çok küçük tutarlar için birikim yapılabilir

## 🔍 Payout Durumunu Kontrol Etme

1. **Stripe Dashboard → Payments → Payouts** bölümüne gidin
2. Tüm payout'ları görebilirsiniz:
   - **Pending**: Bekleyen transferler
   - **In transit**: Yolda olan transferler
   - **Paid**: Revolut'a ulaşan transferler
   - **Failed**: Başarısız transferler (IBAN hatası vb.)

## 🆘 Sorun Giderme

### Payout başarısız oldu?

1. **IBAN'ı kontrol edin**: Boşluk olmadan, doğru formatta olmalı
2. **BIC'i kontrol edin**: `REVOLT21` doğru mu?
3. **Hesap sahibi adı**: Stripe ve Revolut'ta aynı olmalı
4. **Revolut hesap durumu**: Hesabınız aktif mi?

### Para Revolut'a gelmedi?

1. **Stripe Dashboard'da payout durumunu kontrol edin**
2. **Revolut'ta "Transactions" bölümüne bakın**
3. **2-7 iş günü bekleyin** (ilk transferler daha uzun sürebilir)
4. **Stripe Support'a başvurun**: [https://support.stripe.com](https://support.stripe.com)

## 📞 Destek

- **Stripe Support**: [https://support.stripe.com](https://support.stripe.com)
- **Revolut Support**: Uygulama içi destek veya [help.revolut.com](https://help.revolut.com)

---

**Özet**: Revolut IBAN'ınızı Stripe'a ekleyin, doğrulayın, payout ayarlarını yapın. Artık gelen ödemeler otomatik olarak Revolut hesabınıza aktarılacak! 🎉
